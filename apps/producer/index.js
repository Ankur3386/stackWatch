import { createClient } from "redis";
import {client} from "@repo/db/client"
const redisClient = createClient()
                .on('error',(err)=>{console.log("error connecting client")})
                

     async function main() {
        await redisClient.connect()
      let websiteArray = await client.website.findMany({
        select:{
            url:true,
            id:true
        }
      })

        for(const website of websiteArray ) {
            await redisClient.xAdd(
            'betterUptime:website' ,'*',{
             'id':website.id,
             'url': website.url
            }
        )
        }
                redisClient.destroy()
     }  
     setInterval(main,3*60*1000)