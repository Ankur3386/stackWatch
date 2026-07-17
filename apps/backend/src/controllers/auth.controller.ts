import {signInSchema, signUpSchema} from "../types/type"
import bcrypt from "bcrypt"
import {client} from "@repo/db/client"
import { NextFunction,Response,Request } from "express"
import jwt from "jsonwebtoken"

export const registerUser= async(req:Request,res:Response,next:NextFunction)=>{
try {

        const parsedData = signUpSchema.safeParse(req.body)
   
        if(!parsedData.success){
            return res.status(400).json("send correct credentials")
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

try {
    const parsedData= signInSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json("send correct cerendentials")
    }
    const user = await client.user.findFirst({
        where: {
            username: parsedData.data.username
        }
    })
    if(!user){
        return res.status(404).json("error fetching data")
    }
    const verifiedPassword = bcrypt.compare(parsedData.data.password,user.password)
    if(!verifiedPassword){
        return res.status(401).json("send correct credentials")
    }
       const token = jwt.sign({
        userId: user.id
       },process.env.secret as string,{
        expiresIn:'7d'
       })
  if(!token){
    return res.status(500).json("error creating token")
  }
       return res.status(200).json({id:user.id,token})
} catch (error) {
    console.log(error)
   return res.status(500).json("server error")
} 
}