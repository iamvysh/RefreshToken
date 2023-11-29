import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js"

const app=express()

config()
dbConnect()

app.use(express.json())

const port=process.env.PORT||8080;

app.listen(port,()=>console.log(`server listening on ${port}`))