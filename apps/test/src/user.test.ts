import { axios2, BACKEND_URL } from "./helper"
    const username= 'ankur+'+Math.random().toString()
describe("SignUp endpoint",()=>{

test("user is not able to signup if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/user/sign-up`,{
    email: username,
    password: '11111111'
 })
 expect(res.status).toBe(400)
})
test("user is  able to signup if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/user/sign-up`,{
    username : username,
    password: '11111111'
 })
 expect(res.status).toBe(200)
})
})



describe("SignIn endpoint",()=>{
test("user is not able to signin if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/user/sign-in`,{
    email: username,
    password: '11111111'
 })
 expect(res.status).toBe(400)
})
test("user is  able to signin if body is incorrect",async()=>{
 const res=await  axios2.post(`${BACKEND_URL}/user/sign-in`,{
    username : username,
    password: '11111111'
 })
 console.log(res)
 expect(res.status).toBe(200)
})
})