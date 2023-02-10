import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js'


// LOGIN Controller
export const Login = asyncHandler(async(req, res) => {
    try {
        const {email, password } = req.body;
        // console.log(email, password)
        const user = await User.findOne({ email });
        const data = { _id: user._id, isAdmin: user.isAdmin   }
        const token = generateToken(data);

        if(user && (await user.matchPassword(password))){
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token,
                createdAt: user.createdAt,
            });
        }
        else{
            return res.status(404).json({message: "Invalid Email or Password"})
        }
    } catch (error) {
        return res.status(404).json({message: "Invalid Email or Password"})
    }
})


// REGISTER Controller
export const Register = asyncHandler(async(req, res) => {
    try {
        const {name, email, isAdmin,  } = req.body;
        const userExist = await User.findOne( {email });
        if(userExist){
            return res.status(400).json({message: "User Already Exist!"})
        }
        const user = await User.create({ ...req.body });
        const data = { _id: user._id, isAdmin  };
        const token = generateToken(data);
        if(user){
            return res.status(201).json({
                _id:user._id,
                name,
                email,
                isAdmin,
                token,
                message: "User saved successfully!"
            })
        }
    } catch (error) {
        return res.status(404).json({message: "Invalid email address"})
    }
})


// PROFILE
export const Profile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const { _id, name, email, isAdmin, createdAt } = user;
    try {
        if(user) return res.status(200).json({_id, name, email, isAdmin, createdAt })
        else return res.status(404).json({message: "User not found"})
    } catch (error) {
        return res.status(404).json({message: "User error"})
    }
})


// UPDATE PROFILE
export const updateProfile = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password) user.password = req.body.password;
            const updateUser = await user.save();
            const { _id, name, email, isAdmin, createdAt } = updateUser;
            return res.status(201).json({ _id, name, email, isAdmin, createdAt})
        }else{
            return res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        return res.status(404).json({message: error})
    }
})


// GET ALL USERS ADMIN
export const getAllUsers = asyncHandler(async(req, res) => {
    const { isAdmin } = req.user;
    try {
        if(!isAdmin) return res.status(401).json({message: "You are not admin"})
        const users = await User.find({});
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "Couldn't process your request!"})
    }
})