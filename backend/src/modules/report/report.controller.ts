import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
import { assessments } from "../../db/data";
import { generatePDF } from "../../utils/pdfGenerator";

export const reportGenerator = async (req: Request, res: Response) => {
  const session_Id = req.body.session_id;
  if (!session_Id) {
    return res.status(400).json({ error: "Please provide a session ID" });
  }
  const assessment = assessments.find((d) => d.session_id === session_Id);
  if (!assessment) return res.status(404).json({ error: "Session not found" });

  try {
    const configPath = path.join(
      __dirname,
      "../../config",
      `${assessment.assessment_id}.json`
    );

    const configExists = fs.existsSync(configPath);
    if (!configExists) {
      throw new Error(`Config file not found: ${configPath}`);
    }
    const config = await fs.readJson(configPath);
    const pdfPath = await generatePDF(session_Id, assessment, config);

    res.json({ success: true, message: `PDF generated at ${pdfPath}` });
  } catch (err: any) {
    console.error("Error Details:", err); 
    res
      .status(500)
      .json({
        error: "Failed to generate PDF",
        details: err.message || err.toString(),
      });
  }
};
