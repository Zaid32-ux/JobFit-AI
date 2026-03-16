import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import { config } from "dotenv"
import documentsRoutes from "./routes/documents.js";
import authRoutes from "./routes/auth.js";
import http from "http";
import { Server as IOServer } from "socket.io";
import { initSocket } from "./utils/socket.js";
import cors from "cors";


config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(express.json());
const server= http.createServer(app);

const allowedOrigins = [       
  "http://localhost:5173",                       
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/docs", documentsRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.json({ ok: true, now: new Date() }));


// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

// Socket.io
const io = new IOServer(server, { cors: { origin: "*" } });
initSocket(io);

  dbConnection();
export default app;