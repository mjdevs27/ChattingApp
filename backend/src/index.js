import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/db.utils.js";

dotenv.config()



const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth" , authRoutes)

app.listen(port , ()=>{
    console.log("server is running", port)
    connectDB()
})
