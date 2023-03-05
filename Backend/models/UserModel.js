import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email:{
        type: String,
        required: [true, 'Please provide a valid email'],
        unique:true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please provide valid email'
        ],
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    country:{
        type: String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
    },
    {
        timestamps:true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    return this.password
})

userSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;