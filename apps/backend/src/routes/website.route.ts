import { Router } from "express";
import { registerUser, signInUser } from "../controllers/auth.controller";
import { authmiddleware } from "../middlewares/auth.middleware";

export const webSiteRouter:Router= Router()
webSiteRouter.use(authmiddleware)
webSiteRouter.route('/').post(registerUser)
webSiteRouter.route('/status/:websiteId').get(signInUser)