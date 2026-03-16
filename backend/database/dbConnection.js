import mongoose from "mongoose"; //just mongoose import!
import dotenv from "dotenv"
import { resumePendingJobs } from "../jobs/worker.js";
dotenv.config()
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3eexpys.mongodb.net/JobFit?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(dbLink);
 const dbConnection  = ()=>{
mongoose.connect(dbLink)
    .then(async function (connection) {
        console.log("connected to db")
         // resume pending analysis jobs
       await resumePendingJobs();
    }).catch(err => console.log(err))
 }
export default dbConnection;