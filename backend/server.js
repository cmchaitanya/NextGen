import express from "express"
import cors from "cors"

import { connectDB } from "./config/db.js"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

const app = express()
const port = process.env.PORT || 4000;

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


app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})

//mongodb+srv://chaitanya:<db_password>@cluster0.pdzez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0