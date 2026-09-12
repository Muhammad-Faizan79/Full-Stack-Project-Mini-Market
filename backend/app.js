import express, { json } from "express"
import conectionDb from "./config/db.js"
import dotenv from "dotenv"
import routers from "./routers/index.js"
import cors from "cors"

dotenv.config()
conectionDb()

const app = express()
app.use(cors())
app.use(express.json())

app.use(routers)


app.listen(process.env.PORT,"0.0.0.0" ,()=> console.log(`server is runing on http://locahost:${process.env.PORT}`))