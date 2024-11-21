import express from "express"
import cors from "cors"

import { connectDB } from "./config/db.js"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

import http from "http"
import { Server } from "socket.io"
const app = express()
const port = process.env.PORT || 4000;
const httpServer=http.createServer(app)
const io=new Server(httpServer,{
  cors:{
    origin:'*'
  }
})

app.use(express.json())
app.use(cors())

// db connection
connectDB();


//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)

app.get('/', (req, res) => {
  res.send('Hello...')
})

let messages=[]
io.on('connection',(socket)=>{
  socket.on('sendMsg',(data)=>{
    messages.push(data);
    io.emit('getMsg',messages)
  })
  io.emit('getMsg',messages)
})

httpServer.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})

//mongodb+srv://chaitanya:<db_password>@cluster0.pdzez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0