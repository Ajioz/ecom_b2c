import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import  asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protect = asyncHandler(async(req, res, next) => {
    
    let authorization = req.headers.authorization;
    let token;
    
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id.id).select('-password')
        next()
    }if(!token){
        res.status(401);
        throw new Error("You are not eligible to access information this time!")
    }
})

export default protect;