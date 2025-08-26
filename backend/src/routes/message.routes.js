import express from "express"
import validateProfileMiddleware from "../middlewares/auth.middleware"
import { getUsersforSideBar } from "../controllers/message.controllers"


const router = express.Router()


router.get("/users" , validateProfileMiddleware , getUsersforSideBar)

export default router