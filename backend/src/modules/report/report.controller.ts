import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
import { assessments } from "../../db/data";
import { generatePDF } from "../../utils/pdfGenerator";

export const getAssessments = async (req: Request, res: Response) => {
  try {
    const configDir = path.join(__dirname, "../../config");
    const configFiles = await fs.readdir(configDir);
    const configs: any = {};
    for (const file of configFiles) {
      if (file.endsWith(".json")) {
        const config = await fs.readJson(path.join(configDir, file));
        configs[config.assessment_id] = config;
      }
    }

    const assessmentList = assessments.map(assessment => {
      const config = configs[assessment.assessment_id] || { template: { header: "Unknown Report" } };
      return {
        session_id: assessment.session_id,
        assessment_id: assessment.assessment_id,
        header: config.template.header,
        healthScore: assessment.accuracy || 0,
        heartRate: assessment.vitalsMap?.vitals?.heart_rate || null,
        bloodPressure: {
          systolic: assessment.vitalsMap?.vitals?.bp_sys || null,
          diastolic: assessment.vitalsMap?.vitals?.bp_dia || null,
        },
      };
    });

    res.json(assessmentList);

  } catch (err: any) {
    console.error("Error fetching assessments:", err);
    res.status(500).json({
      error: "Failed to fetch assessments",
      details: err.message || err.toString(),
    });
  }
};

export const reportGenerator = async (req: Request, res: Response) => {
  const session_Id = req.params.session_Id;
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
    res.status(500).json({
      error: "Failed to generate PDF",
      details: err.message || err.toString(),
    });
  }
};
