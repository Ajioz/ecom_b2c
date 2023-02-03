import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import  asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protect = asyncHandler(async(req, res, next) => {
    
    let authorization = await req.headers.authorization;
    let token;
    
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1];
            let decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken._id).select('-password');
            // console.log(decodedToken)
            next()
        } catch (error) {
            return res.status(401).json({message:"Not Authorized, token failed!"})
        }
    }if(!token){
        return res.status(401).json({message: "Not eligible, no token!"})
    }
})

export default protect;