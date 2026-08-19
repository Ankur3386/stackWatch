import { Router } from "express";
import { registerUser, signInUser } from "../controllers/auth.controller";
import { authmiddleware } from "../middlewares/auth.middleware";
import { addWebsite, getStatusWebsite, getUserWebsite } from "../controllers/website.controller";

export const webSiteRouter:Router= Router()
webSiteRouter.use(authmiddleware)
webSiteRouter.route('/').post(addWebsite)
webSiteRouter.route('/status/:websiteId').get(getStatusWebsite),
webSiteRouter.route('/').get(getUserWebsite)