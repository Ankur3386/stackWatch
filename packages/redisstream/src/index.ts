import { createClient } from "redis";
const redisClient = await  createClient()
                                  .on('error',(err)=>{console.log("error connecting client")})
                                  .connect()


type WebsiteEvent={
    id: string,
    url: string
}                                  
async function  xAdd({url,id}:WebsiteEvent){
            await redisClient.xAdd(
            'betterUptime:website' ,'*',{
             'id':id,
             'url': url
            }
        )
}
export async function addBulk(websites:WebsiteEvent[]){

        for(const website of websites) {
       await  xAdd({id:website.id,url:website.url})
        }
}