
import axios from "axios";
import { createUser,axios2 , BACKEND_URL  } from "./helper";

describe("testing for website",()=>{
    let token =""
    
    beforeAll(async()=>{
        const data = await createUser()
        token =data.token
    })
    test("test fail if user does not give website url ",async()=>{
        const res = await axios2.post(`${BACKEND_URL}/website`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
    })

        expect(res.status).toBe(400);

    })
    test("test if user able to add website ",async()=>{
        const res = await axios2.post(`${BACKEND_URL}/website`,{
         url: "www.google.com"
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        expect(res.status).toBe(200);
    })
    test("test fail if user does not pass token",async()=>{
           const res = await axios2.post(`${BACKEND_URL}/website`,{
         url: "www.google.com"
        })

        expect(res.status).toBe(401);
    })

})
describe("testing to fetch user website",()=>{
    let token=""
    beforeAll(async()=>{
        const data = await createUser()
        token =data.token

        await axios.post(`${BACKEND_URL}/website`,{
            url:"github.com"
        })
         await axios.post(`${BACKEND_URL}/website`,{
            url:"github.com"
        })

    })
   
    test("test passes as token provided ",async()=>{
         const res = await axios.get(`${BACKEND_URL}/website`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })   

    expect(res.status).toBe(200);
    expect(res.data.length).toBe(2);
    })

        test("test fails as token is not provided ",async()=>{
         const res = await axios.get(`${BACKEND_URL}/website`)   

    expect(res.status).toBe(401);

    })
  

})

