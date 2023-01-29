import express from 'express';
import asyncHandler from 'express-async-handler'
import protect from '../Middleware/AuthMiddleWare.js';
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js'
// import { StatusCodes } from 'http-status-codes';
const userRoute = express.Router();


// USER LOGIN
userRoute.post('/login', asyncHandler(async(req, res)=>{
    
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    const data = { id: user._id, isAdmin: user.isAdmin   }
    const token = generateToken(data);

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
            createdAt: user.createdAt,
        });
    }else{
        res.status(404);
        throw new Error("Invalid Email or Password")
    }

}))

// REGISTER
userRoute.post('/signup', protect, asyncHandler(async(req, res)=>{
    const {email, isAdmin, name } = req.body;
    const userExist = await User.findOne( {email });
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist!");
    }
    const user = await User.create({ ...req.body });
    const data = { _id: user._id, isAdmin  };
    const token = generateToken(data);
    if(user){
        return res.status(201).json({
            id:user._id,
            name,
            email,
            isAdmin,
            token,
            message: "User saved successfully!"
        })
    }else{
        res.status(404);
        throw new Error("Invalid User Data")
    }
}));


// PROFILE
userRoute.get('/profile', protect, asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        })
    }else{
        res.status(404);
        throw new Error("User not found")
    }
}));


export default userRoute;