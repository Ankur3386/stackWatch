
import { createUser,axios2 , BACKEND_URL  } from "./helper";

describe("testing for website",()=>{
    let token =""
    
    beforeAll(async()=>{
        const data = await createUser()
        token =data.token
    })
    test("test fail if user does not give website url ",async()=>{
        const res = await axios2.post(`${BACKEND_URL}/website`)

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

