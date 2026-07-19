import {client} from "@repo/db/client"  
import { NextFunction,Response,Request } from "express"
import { addWebsiteSchema } from "../types/type";


const addWebsite =async(req:Request,res:Response,next:NextFunction)=>{

try {
		const parsedData = addWebsiteSchema.safeParse(req.body)
		if(!parsedData.success){
			return res.status(400).json("send correct crendentials")
		}
	
	if(!req.userId){
		return res.status(403).json("token not sent");
	}
	
	const web= await client.website.create({
		data:{
			url: parsedData.data.url,
			timeAdded: new Date(),
			user_id: req.userId!
		}
	})
	
	return res.status(200).json("entry made")
} catch (error) {
	return res.status(500).json({
        message: "Internal server error"
    });
}
}


const getStatusWebsite=async(req:Request,res:Response,next:NextFunction)=>{


}