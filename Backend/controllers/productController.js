import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js';




// Get All Products
export const getAllProducts = asyncHandler(async(req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword 
        ? {
            name:{
                $regex: req.query.keyword,
                $options: 'i',
            },
        } : {}
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({_id: -1})
        return res.json( { products, page, pages: Math.ceil(count / pageSize) })
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: "Problem with method"})
    }
});



// Admin Get All Product Without search and pagination
export const getAllProductAdmin = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 });
        return  res.status(200).json(products)
    } catch (error) {
        console.error(error)
        return res.status(400).json({Message: "Couldn't process your request!"})
    }
})



// Get one Product
export const getOneProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        if(product) return res.status(200).json(product);
        else{
            return res.status(404).json({message: 'Product not Found'});
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: "Something didn't go well with request"})
    }
});



//PRODUCT REVIEW 
export const productReview = asyncHandler(async(req, res) => {
    try {
        const {rating, comment } = req.body;
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
        product.numberReview = product.reviews?.length;
        product.rating = product.reviews.reduce((acc, item ) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        return res.status(201).json({message: "Review added"});
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "Error Reviewing"});
    }
})

// Delete Product
export const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            await product.remove();
            return res.status(200).json({message: "Product deleted"})
        }
        else{
            return res.status(404).json({message: 'Product not Found'});
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: "Something didn't go well with request"})
    }
});


// Create Product
export const createProduct = asyncHandler(async(req, res) => {
    try {
        const { name, price, description, image, stock } = req.body;
        const productExist = await Product.findOne({ name });
        if(productExist) return res.status(404).json({message: 'Product name already exist'});
        await Product.create({
            name, 
            price, 
            description, 
            image, 
            stock,
            user: req.user._id,
         });
        return res.status(201).json({message: "Product added"})     
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: "Something didn't go well with request"})
    }
});


// Edit Product
export const editProduct = asyncHandler(async(req, res) => {
    try {
        const { body : { name, price, description, image, stock }, params: { id } } = req;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: `Product with ID ${id} doesn't exist`});      
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description; 
        product.image = image || product.image; 
        product.stock = stock || product.stock;
        const updatedProduct = await product.save();
        return res.status(201).json(updatedProduct)     
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: "Something didn't go well with request"})
    }
});