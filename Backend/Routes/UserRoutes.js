import express from 'express';
import protect from '../Middleware/AuthMiddleWare.js';
const userRoute = express.Router();

import { 
    getAllUsers,
    Login, 
    Profile, 
    Register, 
    updateProfile 
} from '../controllers/userController.js';


// GET ALL USER ADMIN
userRoute.get('/', protect, getAllUsers);

// USER LOGIN
userRoute.post('/login', Login);

// REGISTER
userRoute.post('/signup', Register);

// PROFILE & UPDATE PROFILE
userRoute.route('/profile').get(protect, Profile).put(protect, updateProfile)


export default userRoute;