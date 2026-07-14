import {z} from "zod"
export const signUpSchema=z.object({
    username: z.string().min(4),
    password: z.string().min(5)
})