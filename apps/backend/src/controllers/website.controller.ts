import {client} from "@repo/db/client"  
import { NextFunction,Response,Request } from "express"
import { addWebsiteSchema } from "../types/type"

export const addWebsite =async(req:Request,res:Response,next:NextFunction)=>{

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
export const getStatusWebsite=async(req:Request<websiteId>,res:Response,next:NextFunction)=>{

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
				take:10 // as 3 min interval so we have 30min of status 
			}
		}
	})
	if(!website){
		return res.status(400).json("website does not exist")
	}

	return res.status(200).json(website)

}

export const getUserWebsite= async(req:Request,res:Response,next:NextFunction)=>{
	try {
		const getUserWebsite = await client.website.findMany({
			where:{
				user_id: req.userId
			}
		})
		return res.status(200).json(getUserWebsite)
	} catch (error) {
		return res.status(400).json("error feetching website")
	}
}