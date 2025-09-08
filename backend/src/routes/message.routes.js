import express from "express"
import validateProfileMiddleware from "../middlewares/auth.middleware.js"
import { getUsersforSideBar , getMessages , sendMessages } from "../controllers/message.controllers.js"
// import { send } from "vite"


const router = express.Router()


router.get("/users" , validateProfileMiddleware , getUsersforSideBar)


router.get("/:id" , validateProfileMiddleware , getMessages)


router.post("/send/:id" , validateProfileMiddleware , sendMessages)
export default router