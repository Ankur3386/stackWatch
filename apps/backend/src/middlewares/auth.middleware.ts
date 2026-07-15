import { Request,NextFunction, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export const authmiddleware=async(req:Request,res:Response,next:NextFunction)=>{

    const token= req.headers.authorization?.split(' ')[1]
    if(!token){
          return res.status(500).json("please send token first")
    }

try {
        const verifiedToken= jwt.verify(token,process.env.secret as string) as JwtPayload
        req.userId= verifiedToken.id   
    next()
} catch (error) {
    return res.status(500).json("access not allowed")
}
}