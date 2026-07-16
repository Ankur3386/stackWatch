import axios from "axios";

export const BACKEND_URL = "http://localhost:3002"
export async function createUser():Promise<{id:string,token:string}>{
    const USER_NAME= Math.random().toString()
    const signUpUser= await axios.post(`${BACKEND_URL}/sign-up`,{
        username:USER_NAME,
        password:'11111111'
    })
    
    const signInUser = await axios.post(`${BACKEND_URL}/sign-in`,{
        username:USER_NAME,
        password:'11111111'
    })
  return {id:signInUser.data.id ,token:signInUser.data.token}
}
export const axios2= {
    post:async(...args:Parameters<typeof axios.post>)=>{
     try {
          const res= await axios.post(...args)
          return res;
     } catch (error:any) {
         return error.response
     }
    },
        get:async(...args:Parameters<typeof axios.get>)=>{
     try {
          const res= await axios.get(...args)
          return res
     } catch (error:any) {
         return error.response
     }
    },
        put:async(...args:Parameters<typeof axios.put>)=>{
     try {
          const res= await axios.put(...args)
          return res
     } catch (error:any) {
         return error.response
     }
    },
}
