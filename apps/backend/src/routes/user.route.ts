import { Router } from "express";
import { registerUser, signInUser } from "../controllers/auth.controller";
export const authRouter:Router= Router()

authRouter.route('/signUp').post(registerUser)
authRouter.route('/sign-in').get(signInUser)