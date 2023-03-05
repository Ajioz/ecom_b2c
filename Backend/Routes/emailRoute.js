import express from 'express';
import protect, { Admin } from '../Middleware/AuthMiddleWare.js';
import { 
    sendContactEmail, 
    sendEmails, 
    sendOrderSummary, 
    sendSingleEmail 
} from '../controllers/emailController.js';


const emailRoute = express.Router();

// Send one email to customer 
emailRoute.post('/email', protect, Admin, sendSingleEmail);


// Send Many Email to subscribers
emailRoute.post('/emails', protect, Admin, sendEmails);


// Send Order Summary Email to customer and Admin
emailRoute.post('/ordersummary', protect, sendOrderSummary);


// Send customer enquiry to Admin
emailRoute.post('/contact', sendContactEmail);



export default emailRoute;