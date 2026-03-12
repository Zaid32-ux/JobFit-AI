import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import { config } from "dotenv"
import documentsRoutes from "./routes/documents.js";
import authRoutes from "./routes/auth.js";

config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(express.json());

app.use("/api/docs", documentsRoutes);
app.use("/api/auth", authRoutes);

// Socket.io
const io = new IOServer(server, { cors: { origin: "*" } });
initSocket(io);

  dbConnection();
export default app;