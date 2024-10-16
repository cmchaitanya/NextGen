import express from "express"
import cors from "cors"
import path from 'path';
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000

// db connection
connectDB();


//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/uploads",express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Hello...')
})


app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})

//mongodb+srv://chaitanya:<db_password>@cluster0.pdzez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0