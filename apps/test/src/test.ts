import axios from "axios"

const BACKEND_URL = "http://localhost:3002"
const axios2= {
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

describe("testing for passing parameter",()=>{
    test("passing no url test should fail",async()=>{
        const res = await axios2.post(`${BACKEND_URL}/website`)

        expect(res.status).toBe(401);

    })

})

