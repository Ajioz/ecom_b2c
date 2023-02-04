import express from 'express';
import protect from '../Middleware/AuthMiddleWare.js'

import {
    getAllProducts, 
    getOneProduct,
    productReview,
} from '../controllers/productController.js';

const productRoute = express.Router();

// GET ALL PRODUCTS
productRoute.get('/', getAllProducts)

// GET ONE PRODUCT
productRoute.get('/:id', getOneProduct);

//PRODUCT REVIEW 
productRoute.post('/:id/review', protect, productReview);

export default productRoute;