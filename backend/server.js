import express from "express"
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./config/db.js"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 4000

// db connection
connectDB();


//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
// app.use("/uploads",express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello...')
})


app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})

//mongodb+srv://chaitanya:<db_password>@cluster0.pdzez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0