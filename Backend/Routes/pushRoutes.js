import { Router } from 'express';
import protect, { Admin } from '../Middleware/AuthMiddleWare.js';
import { registerPushNotify, sendPushNotification } from '../controllers/pushController.js';

const pushRoute = Router();

// REGISTER A PUSH NOTIFICATION CLIENT
pushRoute.post('/subscribe', registerPushNotify);


// SEND A PUSH NOTIFICATION TO CLIENTS
pushRoute.post('/send', protect, Admin, sendPushNotification);


export default pushRoute;