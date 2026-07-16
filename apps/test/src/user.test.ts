import { axios2, BACKEND_URL } from "./helper"
    const username= Math.random().toString()
describe("SignUp endpoint",async()=>{

test("user is not able to signup if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/sign-up`,{
    email: username,
    password: '1111111'
 })
 expect(res.status).toBe(400)
})
test("user is  able to signup if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/sign-up`,{
    username : username,
    password: '1111111'
 })
 expect(res.status).toBe(200)
})
})
describe("SignIn endpoint",async()=>{
    const username= Math.random().toString()
test("user is not able to signin if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/sign-up`,{
    email: username,
    password: '1111111'
 })
 expect(res.status).toBe(400)
})
test("user is  able to signin if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/sign-up`,{
    username : username,
    password: '1111111'
 })
 expect(res.status).toBe(200)
})
})