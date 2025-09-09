import express from "express";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/db.utils.js";

dotenv.config()



const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))

app.use("/api/auth" , authRoutes)

app.use("/api/messages" , messageRoutes)

app.listen(port , ()=>{
    console.log("server is running", port)
    connectDB()
})
