import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';


const generateToken = (_id) => {
    return jwt.sign (_id, process.env.JWT_SECRET, 
        { 
            expiresIn: process.env.JWT_LIFETIME 
        }
    )
}       

export default generateToken;