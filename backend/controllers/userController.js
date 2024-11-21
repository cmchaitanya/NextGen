import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import validator from "validator"

// login user
const login =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user =await userModel.findOne({email});
        if (!user) {
            res.json({success:false,message:"User Doesn't exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Password is incorrect"});
        }
        const token =createToken(user._id);
        res.json({ success: true, token, userId: user._id, username:user.username });
        // res.json({success:true,token})
    } catch (error) {
        console.log({success:false,message:"Error"});
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//signup user 
const signup =async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const roll = req.body.roll;
    const branch = req.body.branch;
    const hostel = req.body.hostel;
    const contact = req.body.contact;
    const password = req.body.password;
    const mobile = req.body.mobile;
    try {
        // checking is user already exist
        const exists =await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email formate and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid E-mail"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Enter a strong password"})
        }
        // hashing user password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
             username : username,
             email : email,
             roll : roll,
             branch : branch,
             hostel : hostel,
             contact : contact,
             password : hashedPassword,
             mobile : mobile
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token, userId: user._id, username:user.username });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const likeProducts= (req,res)=>{
    let productId = req.body.productId;
    let userId = req.body.userId;
    userModel.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'product is not liked' })
        })
}

const dislikeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    userModel.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'disliked success.' });
        })
        .catch(() => {
            res.send({ message: 'product is not disliked' });
        });
};


const likedProducts = (req, res) => {
    userModel.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'failure to fetch liked products' })
        })
}

const myProfileById = (req, res) => {
    let uid = req.params.userId
    userModel.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    username : result.username,
                    email : result.email,
                    roll : result.roll,
                    branch : result.branch,
                    hostel : result.hostel,
                    contact : result.contact,
                    mobile : result.mobile
                }
            })
        })
        .catch(() => {
            res.send({ message: 'failed to fetch user profile' })
        })
    return;
}

const getUserById = (req, res) => {
    const _userId = req.params.uId;
    userModel.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username,
                    likedProducts:result.likedProducts
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}

export {login,signup,likeProducts,dislikeProducts,likedProducts,myProfileById,getUserById}