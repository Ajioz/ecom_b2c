import express from 'express';
import { 
    createSubscriber, 
    deleteSubscriber, 
    getSubscribers 
} from '../controllers/subController.js';

const subRoute = express.Router();

// Get Subscribers
subRoute.route('/').get(getSubscribers).post(createSubscriber);

// Delete Subscriber
subRoute.delete('/:id', deleteSubscriber);


export default subRoute;