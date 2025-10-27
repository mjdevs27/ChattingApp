import express from "express";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/db.utils.js";
import cors from "cors"
import { app , server } from "./utils/socket.js";

import path from "path";

dotenv.config()



// const app = express();

const port = process.env.PORT
const __dirname = path.resolve()

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({ limit: "10mb", extended: true })); 
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))

app.use("/api/auth" , authRoutes)

app.use("/api/messages" , messageRoutes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));

    app.get("*" ,(req,res)=>{
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"));
    });
}

server.listen(port , ()=>{
    console.log("server is running", port)
    connectDB()
})
