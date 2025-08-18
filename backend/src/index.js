import express from "express";
import authRotues from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./utils/db.utils.js";

dotenv.config()



const app = express();
const port = process.env.PORT
app.use("/api/auth" , authRotues)

app.listen(port , ()=>{
    console.log("server is running", port)
    connectDB()
})
