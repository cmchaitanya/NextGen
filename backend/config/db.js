import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://chaitanya:chaitanya@cluster0.pdzez.mongodb.net/NextGen")
    .then(()=>console.log("DB connected"))
}