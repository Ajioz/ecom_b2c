import express from 'express';
import protect from '../Middleware/AuthMiddleWare.js';
const userRoute = express.Router();

import { 
    Login, 
    Profile, 
    Register, 
    updateProfile 
} from '../controllers/userController.js';

// USER LOGIN
userRoute.post('/login', Login);

// REGISTER
userRoute.post('/signup', Register);

// PROFILE
userRoute.get('/profile', protect, Profile);

// UPDATE PROFILE
userRoute.put('/profile', protect, updateProfile);


export default userRoute;