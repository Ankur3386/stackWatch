import { client } from "@repo/db/client"
import {xAck,xAckBulk,xReadGroup} from "@repo/redisstream/client"
import axios from "axios"
const WORKER_ID= process.env.WORKER_ID!
const REGION_ID= process.env.REGION_ID!

if(!WORKER_ID){
   throw new Error("WORKER_ID not provided")
}
if(!REGION_ID){
   throw new Error("REGION_ID not provided")
}
async function main() {
while(1){

   //S1->READ FROM QUEUE
   //S2-> store response in DB (better approach here is put res in a queue and than do a bulk upload in db)
   //S3->  ack back to queue as the event has been processed
  const res= await xReadGroup(REGION_ID,WORKER_ID)
  if(!res){
   continue ;
  }
 let promises=res.map(({id,message})=>{
      const url = message.url
   const websiteId= message.id
   const startTime= Date.now();
   return new Promise<void>((resolve,reject)=>{
     axios.get(url).then(async()=>{
     const endTime= Date.now()
     await  client.websiteTick.create({
         data:{
         response_time_ms: endTime-startTime,
         status: "Up",
         website_id:websiteId,
         region_id:REGION_ID
         }
     })
     resolve()
   }
  
   ).catch(async()=>{
      const endTime= Date.now()
        await  client.websiteTick.create({
         data:{
         response_time_ms: endTime-startTime,
         status: "Up",
         website_id:websiteId,
         region_id:REGION_ID
         }
     })
  resolve()
 })
}

)})
console.log(promises.length)
 await Promise.all(promises)

//these eventID are redis id not the db websiteId
await   xAckBulk(REGION_ID, res.map(({id})=>id))


   
}
}
main()