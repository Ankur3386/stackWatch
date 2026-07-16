import {signInSchema, signUpSchema} from "../types/type"
import bcrypt from "bcrypt"
import {client} from "@repo/db/client"
import { NextFunction,Response,Request } from "express"

export const registerUser= async(req:Request,res:Response,next:NextFunction)=>{
try {
        const parsedData = signUpSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(403).json("send correct credentials")
        }
        const hashedPassword= await bcrypt.hash(parsedData.data.password,10)

        const user = await client.user.create({
            data:{
                username: parsedData.data.username,
                password: hashedPassword
            }
        })

        return res.status(200).json({message:"user created successfully"})
} catch (error) {
    return res.status(500).json({message: " error creating user"})
}
}
export const signInUser = async(req:Request,res:Response,next:NextFunction)=>{

const parsedData= signInSchema.safeParse(req.body)
if(!parsedData.success){
    return res.status(401).json("send correct cerendentials")
}


    
}