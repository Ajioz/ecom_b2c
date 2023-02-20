import express from 'express';
import { sendSms } from '../controllers/smsController_v2.js';
import protect from '../Middleware/AuthMiddleWare.js';


const smsRoute = express.Router();


smsRoute.post('/', protect, sendSms);



export default smsRoute;