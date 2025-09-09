import express from "express"
import { login, logout, signup , checkAuth} from "../controllers/auth.controllers.js"
import validateProfileMiddleware from "../middlewares/auth.middleware.js"
import { updateProfile } from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/signup" , signup)

router.post("/login" , login)

router.post("/logout" , logout)

router.put("/update-profile" , validateProfileMiddleware , updateProfile)

router.get("/check", validateProfileMiddleware, checkAuth);


export default router