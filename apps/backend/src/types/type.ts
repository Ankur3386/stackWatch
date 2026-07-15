import {z} from "zod"
export const signUpSchema=z.object({
    username: z.string().min(4),
    password: z.string().min(5)
})
export const signInSchema= z.object({
    
})

declare global{
    namespace Express{
        interface Request{
       userId?:string        
        }
    }
}