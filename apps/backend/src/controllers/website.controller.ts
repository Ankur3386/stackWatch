import {client} from "@repo/db/client"  
import { NextFunction,Response,Request } from "express"
import { addWebsiteSchema } from "../types/type"
import { includes } from "zod"


const addWebsite =async(req:Request,res:Response,next:NextFunction)=>{

const parsedData= addWebsiteSchema.safeParse(req.body)
if(!parsedData.success){
	return res.status(400).json("send correct url")
}
if(!req.userId){
	return  res.status(400).json("send correct token")
}
const web= await client.website.create({
	data:{
		url: parsedData.data.url,
		timeAdded: new Date(),
		user_id: req.userId
	}
})

return res.status(200).json({id: web.id})
}

interface websiteId{
	websiteId:string
}
const getStatusWebsite=async(req:Request<websiteId>,res:Response,next:NextFunction)=>{

	const website= await client.website.findFirst({
		where:{
			user_id: req.userId,
			id:req.params.websiteId
		},
		include:{
			ticks:{
				orderBy:[{
					createdAt: 'desc'
				}],
				take:1
			}
		}
	})
	if(!website){
		return res.status(400).json("website does not exist")
	}

	return res.status(200).json(website)

}