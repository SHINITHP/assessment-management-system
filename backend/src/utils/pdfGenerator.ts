import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { extractValue, classifyValue } from './dataExtractor';

export async function generatePDF(sessionId: string, data: any, config: any): Promise<string> {
  const renderedData = {
    header: config.template.header,
    footer: config.template.footer.replace('{date}', new Date().toLocaleDateString()),
    sections: (config.sections || []).map((section: any) => ({
      title: section.title,
      fields: (section.fields || []).map((field: any) => {
        const path = field.valuePath || field.jsonPath;
        if (!path) {
          console.log("Skipping field due to missing path:", field.label);
          return {
            label: field.label,
            value: 'N/A',
            isArray: false,
            unit: field.unit || '',
            classification: '',
            colorClass: ''
          };
        }
        const value = extractValue(data, path);
        const isArray = Array.isArray(value);
        const score = field.scorePath ? parseFloat(extractValue(data, field.scorePath)) : parseFloat(value);
        const cls = classifyValue(score || value, field.classifications || []);
        return {
          label: field.label,
          value: isArray ? value : value.toString(),
          isArray,
          unit: field.unit || '',
          classification: cls.label,
          colorClass: cls.color ? `text-${cls.color}-500` : ''
        };
      })
    }))
  };

  const templatePath = path.join(__dirname, '../../templates/report.ejs');
  const templateExists = fs.existsSync(templatePath);
  if (!templateExists) {
    throw new Error(`Template file not found: ${templatePath}`);
  }
  const html = await ejs.renderFile(templatePath, renderedData);

  const pdfPath = path.join(__dirname, '../../reports', `${sessionId}.pdf`);
  const dirExists = fs.existsSync(path.dirname(pdfPath));
  await fs.ensureDir(path.dirname(pdfPath));
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();
  return pdfPath;
}