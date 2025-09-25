import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs-extra";
import path from "path";
import ejs from "ejs";
import {
  extractValue,
  classifyValue,
  extractArrayValue,
} from "./dataExtractor";

export async function generatePDF(
  sessionId: string,
  data: any,
  config: any
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const assessmentId = data.assessment_id || "unknown";
  const uniqueId = `${sessionId}_${assessmentId}_${timestamp}`;
  const pdfFilename = `${uniqueId}.pdf`;

  const renderedData = {
    header: config.template.header,
    footer: new Date().toLocaleDateString(),
    sections: (config.sections || []).map((section: any) => ({
      title: section.title,
      fields: (section.fields || []).map((field: any) => {
        const path = field.valuePath || field.jsonPath;
        if (!path) return null;

        const value = extractValue(data, path);
        const isArray = Array.isArray(value);
        const score = parseFloat(value);
        const cls = classifyValue(score || value, field.classifications || []);
        const clsArray = field.classifications || [];

        return {
          label: field.label || "",
          value: isArray ? value : value.toString(),
          isArray,
          unit: field.unit || "",
          clsLabel: cls.label,
          color: cls.color,
          textColorClass: cls.color ? `text-${cls.color}-600` : "text-gray-800",
          bgColorClass: cls.color ? `bg-${cls.color}-100` : "bg-gray-200",
          colorClass: cls.color ? `text-${cls.color}-500` : "",
          classifications: clsArray.map((c: any) => ({
            label: c.label,
            color: c.color || "yellow-600",
            bgColor: c.color || "rgba(253, 230, 138, 0.5)",
            min: c.min,
          })),
          sections: (field.sections || []).map((section: any) => {
            const sectionValue = extractArrayValue(data, section.path) || [];
            return {
              label: section.label,
              value: [sectionValue],
              isArray: Array.isArray(sectionValue),
            };
          }),
        };
      }),
    })),
  };

  const templatePath = path.join(__dirname, "../../templates/report.ejs");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}`);
  }
  const html = await ejs.renderFile(templatePath, renderedData);

  const pdfPath = path.join(__dirname, "../../reports", pdfFilename);
  await fs.ensureDir(path.dirname(pdfPath));

  // Get runtime properties from the chromium module
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true, 
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
  });

  await browser.close();
  return pdfPath;
}
