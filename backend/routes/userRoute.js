import express from "express"
import {login,signup,likeProducts,dislikeProducts,likedProducts,myProfileById,getUserById} from "../controllers/userController.js"

const userRouter =express.Router()

userRouter.post('/like-product',likeProducts)
userRouter.post('/dislike-product',dislikeProducts)
userRouter.post('/liked-products',likedProducts)
userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.get('/my-profile/:userId',myProfileById)
userRouter.get('/get-user/:uId',getUserById)

export default userRouter;