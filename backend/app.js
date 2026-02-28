import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import { config } from "dotenv"

config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(express.json());

  dbConnection();
export default app;