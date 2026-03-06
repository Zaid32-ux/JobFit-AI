import Document from "../models/Document.js";

export const limitDocumentsPerDay =
  (maxDocs = 10) =>
  async (req, res, next) => {
    try {
      const userId = req.user && req.user._id;

      if (!userId) {
        return res.status(401).json({ error: "Not authorized" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export default limitDocumentsPerDay;