import {client} from "@repo/db/client"  
import { NextFunction,Response,Request } from "express"


const addWebsite =async(req:Request,res:Response,next:NextFunction)=>{


const web= await client.website.create({
	data:{
		url: "google.com",
		timeAdded: '2026-07-09 21:05:00+05:30',
		user_id: req.userId
	}
})

return res.status(200).json("entry made")
}


const getStatusWebsite=async(req:Request,res:Response,next:NextFunction)=>{


}