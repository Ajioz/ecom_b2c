import express from 'express';
import { 
    createOrder,
    getOrderId,
    orderIsPaid,
    userOrder,
 } from '../controllers/orderController.js';
import protect from '../Middleware/AuthMiddleWare.js';

const orderRoute = express.Router();

// USER ORDERS
orderRoute.get('/', protect, userOrder);


// CREATE ORDER
orderRoute.post('/', protect, createOrder);


// GET ORDER BY ID
orderRoute.get('/:id', protect, getOrderId);


// ORDER IS PAID
orderRoute.put('/:id/pay', protect, orderIsPaid);



export default orderRoute;