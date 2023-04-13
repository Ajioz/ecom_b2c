import express from 'express'
import { 
    getUsers, 
    leaveChat, 
    login, 
    deleteUser, 
    online_users, 
    register, 
} from '../controllers/chatUserController.js';


const chatUserRoute = express.Router();


chatUserRoute.post('/register', register);
chatUserRoute.post('/login', login);
chatUserRoute.post("/leaveChat/:id", leaveChat);
chatUserRoute.get('/allUsers/:id', getUsers);
chatUserRoute.get('/online/', online_users);
chatUserRoute.post("/delete", deleteUser);



export default chatUserRoute;