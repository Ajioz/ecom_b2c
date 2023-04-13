import express from 'express'
import { addMessage, getAllMessages } from '../controllers/chatController.js';

const chatRoute = express.Router();

chatRoute.post('/add_msg', addMessage);
chatRoute.post('/get_msg', getAllMessages);

export default chatRoute;