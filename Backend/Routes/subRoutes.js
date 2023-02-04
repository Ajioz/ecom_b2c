import express from 'express';
import { 
    createSubscriber,
    getSubscribers,
} from '../controllers/subController.js';


const subRoute = express.Router();

// Get Subscribers
subRoute.get('/', getSubscribers);

// Create Subscriber
subRoute.post('/', createSubscriber);


export default subRoute;
