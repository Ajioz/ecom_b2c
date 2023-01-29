import express from 'express';
import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js';

const productRoute = express.Router();


// GET ALL PRODUCTS
productRoute.get('/products', asyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
}))


// GET ONE PRODUCT
productRoute.get('/products/:id', asyncHandler(async(req, res)=>{
    const product = await Product.findOne({_id: req.params.id});
    if(product) return res.status(200).json(product);
    else{
        res.status(404);
        throw new Error('Product not Found');
    }
}))

export default productRoute;