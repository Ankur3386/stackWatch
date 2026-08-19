import { createClient } from "redis";
const redisClient = await  createClient()
                                  .on('error',(err)=>{console.log("error connecting client")})
                                  .connect()

const STREAM_NAME= 'betterUptime:website'
type WebsiteEvent={
    id: string,
    url: string
}   
type MessageEvent={
    id:string,
     message:{
        id: string,
        url:string
           }
}                               
async function  xAdd({id,url}:WebsiteEvent){
            await redisClient.xAdd(
            STREAM_NAME ,'*',{
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

export async function xReadGroup(consumerGroup:string,regionId:string):Promise<MessageEvent[] | undefined>{
    const res = await redisClient.xReadGroup(
  consumerGroup,
  regionId, {
    key: STREAM_NAME,
    id: '>'
  }, {
    COUNT: 5
  }
);
//@ts-ignore
let messages:MessageEvent[] | undefined = res?.[0]?.messages

return messages
}
export async function xAck(consumerGroup:string,eventId:string) {
    //TODO-->  stores this res so that if ack one fails than we can retry again 
     await redisClient.xAck(STREAM_NAME, consumerGroup, eventId)

}
export async function xAckBulk(consumerGroup:string,events:string[]) {
 await Promise.all( events.map((eventId)=>{ xAck(consumerGroup,eventId)}))
}