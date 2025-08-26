import express from "express"
import validateProfileMiddleware from "../middlewares/auth.middleware"
import { getUsersforSideBar , getMessages , sendMessages } from "../controllers/message.controllers"
import { send } from "vite"


const router = express.Router()


router.get("/users" , validateProfileMiddleware , getUsersforSideBar)


router.get("/:id" , validateProfileMiddleware , getMessages)


router.post("/send/:id" , validateProfileMiddleware , sendMessages)
export default router