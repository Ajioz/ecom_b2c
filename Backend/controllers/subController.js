import asyncHandler from 'express-async-handler';
import Subscriber from '../models/subscriberModel.js';


// Get Subscribers
export const getSubscribers = asyncHandler(async(req, res) => {
    try {
        const subscribers = await Subscriber.find({});
        if(!subscribers) return res.status(404).json({message: "No Subscribers!"})
        return res.status(200).json(subscribers);
    } catch (error) {
        // console.error(error);
        return res.status(400).json({message: "Couldn't process request"})
    }
})

// Create Subscriber
export const createSubscriber = asyncHandler(async(req, res) => {
    const { email } = req.body;
    try {
        if(!email) return res.status(404).json({message: "Empty Field"})

        const userExist = await Subscriber.findOne({ email });
        if(userExist) return res.status(400).json({message: "User Already Subscribed!"});

        const subscribed = await Subscriber.create({ email });
        return res.status(201).json(subscribed);
    } catch (error) {
        // console.error(error);
        return res.status(400).json({message: "Please provide valid email"})
    }
})