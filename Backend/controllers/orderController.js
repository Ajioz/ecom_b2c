import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';



// GET USER ORDERS
export const userOrder = asyncHandler(async(req, res) => {
    try {
        const order = await Order.find({user: req.user._id}).sort({_id: -1})
        return res.status(200).json(order);
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "We couldn't process request"});
    } 
});


// ADMIN GET ALL ORDERS
export const adminGetOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({ }).sort({_id: -1}).populate("user", "id name email phoneNumber")
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "We couldn't process request"});
    } 
});


// CREATE ORDER
export const createOrder = asyncHandler(async(req, res) => {
    let { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice,
        phoneNumber,
        code,
    } = req.body;
    itemsPrice = Number(itemsPrice);
    shippingPrice = Number(shippingPrice);
    taxPrice = Number(taxPrice);
    totalPrice = Number(totalPrice);
    code = Number(code);
    phoneNumber = Number(phoneNumber);
    try {
        if(orderItems && orderItems.length === 0)return res.status(400).json({message: "No order items"})
        else {
            const order =  new Order({
                orderItems, 
                user:req.user._id,
                shippingAddress, 
                paymentMethod, 
                itemsPrice, 
                shippingPrice, 
                taxPrice, 
                totalPrice,
                phoneNumber
            })
            const createOrder = await order.save();
            return res.status(201).json(createOrder); 
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: error})
    }
});


// GET ORDER by ID
export const getOrderId = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate(
    "user",
    "name email phoneNumber, pushNotify",
    )
    try {
        if(order) return res.status(200).json(order)
        return res.status(404).json({message: "Order Not Found"}); 
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"})
    }
})


// ORDER IS PAID
export const orderIsPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    // console.log({order, message: "Order Paid"})
    try {
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id:req.body.id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address:req.body.email_address,
            }
        }
        const updateOrder = await order.save();
        return res.status(201).json(updateOrder);
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"});
    }
})



// ORDER SUMMARY IS SENT
export const orderSummary = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    try {
        if(order){
            order.pushNotify = true;
        }
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"});
    }
})


// ORDER IS DELIVERED
export const orderIsDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    try {
        if(order){
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"});
    }
})