import express from 'express';
import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js';
import protect from '../Middleware/AuthMiddleWare.js'

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
        return res.status(404).json({message: 'Product not Found'});
    }
}));


//PRODUCT REVIEW 
productRoute.post('/products/:id/review', protect, asyncHandler(async(req, res) => {
    try {
        const {rating, comment } = req.body;
        console.log(req.body);
        const product = await Product.findById(req.params.id);
        let alreadyReviewed;
        if(product) {
            alreadyReviewed = product.reviews.find( (r) => r.user.toString() === req.user._id.toString())
        }
        if(alreadyReviewed){
            return res.status(400).json({message: "Product already reviewed"});
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        product.numReviews = product.reviews?.length;
        product.rating = product.reviews.reduce((acc, item ) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        return res.status(201).json({message: "Review added"});
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "Error Reviewing"});
    }
}))

export default productRoute;