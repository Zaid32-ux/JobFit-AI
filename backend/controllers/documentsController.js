import fs from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";
import Document from "../models/Document.js";
import { enqueue } from "../jobs/worker.js";
import Analysis from "../models/Analysis.js";

const uploadsDir = path.resolve("./uploads");

const extractText = async (filePath, mimeType) => {
  const data = await fs.readFile(filePath);
  if (mimeType === "application/pdf") {
    const parser = new PDFParse({ data });
    const textResult = await parser.getText();
    return textResult.text;
  }
  return data.toString("utf8");
};

// Upload document
export const uploadDoc = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File required" });
    const { filename, originalname, mimetype, size, path: filePath } = req.file;
    const { jobDescription } = req.body;
    const text = await extractText(filePath, mimetype);

    // Create document
    const doc = await Document.create({
      user: req.user._id,
      filename,
      originalName: originalname,
      mimeType: mimetype,
      size,
      text,
      jobDescription: jobDescription || null,
    });
    res.json({ doc });
  } catch (err) {
    next(err);
  }
};

export default {
  uploadDoc,
 
};
