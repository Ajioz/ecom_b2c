import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';



// USER ORDERS
export const userOrder = asyncHandler(async(req, res) => {
    try {
        const order = await Order.find({user: req.user._id}).sort({_id: -1})
        return res.status(200).json(order);
    } catch (error) {
        return res.status(400).json({message: error});
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
        totalPrice
    } = req.body;

    itemsPrice = Number(itemsPrice);
    shippingPrice = Number(shippingPrice);
    taxPrice = Number(taxPrice);
    totalPrice = Number(totalPrice);

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
                totalPrice
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
    "name email",
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