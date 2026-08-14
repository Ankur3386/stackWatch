  import {addBulk} from  "@repo/redisstream/client"
  import {client} from "@repo/db/client"
      async function main() {
        let websiteArray = await client.website.findMany({
          select:{
              url:true,
              id:true
          }
        })
     console.log("websiteArray",websiteArray)
      await addBulk(websiteArray.map(website=>({
        url: website.url,
        id: website.id
      })))
      }  
      setInterval(main,3*60*1000)
      main();