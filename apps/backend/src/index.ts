import express from "express"
import {client} from "@repo/db/client"
const app= express()

app.post("/website",async(req,res)=>{


const web= await client.website.create({
	data:{
		url: "google.com",
		timeAdded: '2026-07-09 21:05:00+05:30'
	}
})

return res.status(200).json("entry made")
})

app.get("/status/:websiteId",(req,res)=>{


})


app.listen(3002,()=>{
	console.log("app listeningn on port 3002")
}
	  )
