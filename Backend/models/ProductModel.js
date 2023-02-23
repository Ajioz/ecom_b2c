import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
});

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numberReview:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:true
})

const Product = mongoose.model("Product", productSchema);

export default Product;