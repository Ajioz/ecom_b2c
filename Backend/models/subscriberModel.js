import {Schema, model} from "mongoose";

const subSchema = Schema({
    email:{
        type: String,
        required: [true, 'Please provide a valid email'],
        unique:true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please provide valid email'
        ],
    }
});

const Subscriber = model("Subscriber", subSchema);

export default Subscriber;