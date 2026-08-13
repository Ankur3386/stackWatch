import express from "express"
import { webSiteRouter } from "./routes/website.route"
import { authRouter } from "./routes/user.route"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app= express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/user',authRouter)
app.use('/api/v1/website',webSiteRouter)
app.listen(3002,()=>{
	console.log("app listeningn on port 3002")
})
