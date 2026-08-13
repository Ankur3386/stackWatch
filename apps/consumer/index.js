import { createClient } from "redis";
import {client} from "@repo/db/client"

    const redisClient = createClient()
        .on('err',(err)=> {console.log('error connecting redisClient')})

async function main() {

     
        await redisClient.connect()
        
   while(1){
           const res= await redisClient.xReadGroup(
            'usa',
             'usa-1',
             {
                key: 'betterUptime:website',
                id: '>'
             },
             {
                COUNT: 2
             }
        )
        let webiteToTrack=res[0].messages


        //his is a bad aproach as many call are going to db at a same ime from diff worker so better is all worker push these call to db and from there we do bulk upload  to db
        websiteToTrack.forEach(webiste => {
         let startTime= Date.now()
         axios.get(webiste.url).then(
        client.websiteTick.create({
         data:{
        response_time_ms : Date.now() - startTime,
         status  : "GOOD",
         website_id : website.id,
         region_id  : "usa"
         }
        })
         ).catch()
        });
   }
        
}
main()