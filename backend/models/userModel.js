import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roll: { type: Number, required: true, unique: true },
    branch: { type: String, required: true },
    hostel: { type: String },
    contact: { type: Number, required: true },
    password: { type: String, required: true },
    ad: { type: Object, default: {} },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { minimize: false });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
