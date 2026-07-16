import {z} from "zod"
export const signUpSchema=z.object({
    username: z.string().min(4),
    password: z.string().min(5)
})
export const signInSchema= z.object({
   username: z.string(),
   password: z.string() 
})
export const addWebsiteSchema= z.object({
    url: z.string()
})
declare global{
    namespace Express{
        interface Request{
       userId?:string        
        }
    }
}