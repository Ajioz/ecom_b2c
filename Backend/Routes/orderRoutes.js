import express from 'express';
import { 
    adminGetOrders,
    createOrder,
    getOrderId,
    orderIsDelivered,
    orderIsPaid,
    userOrder,
 } from '../controllers/orderController.js';
import protect, { Admin } from '../Middleware/AuthMiddleWare.js';

const orderRoute = express.Router();

// USER ORDERS.& CREATE ORDER
orderRoute.route('/').get(protect, userOrder).post( protect, createOrder);


// ADMIN GET ALL ORDERS
orderRoute.get('/all', protect, Admin, adminGetOrders);


// GET ORDER BY ID
orderRoute.get('/:id', protect, getOrderId);


// ORDER IS PAID
orderRoute.put('/:id/pay', protect, orderIsPaid);


// ORDER IS PAID
orderRoute.put('/:id/delivered', protect, orderIsDelivered);



export default orderRoute;