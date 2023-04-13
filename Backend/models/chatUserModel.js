import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const chatUserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: [true, 'Please provide a valid email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please provide valid email'
        ]
    },
    password : {
        type: String,
        required: [true, 'Please provide a valid password'],
        min: 3
    },
    isAvatarImageSet : {
        type: Boolean,
        default : false
    },
    avatarImage : {
        type: String,
        default: ""
    },
    online:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, 
    {
        timestamps: true
    }
)

chatUserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password.trim(), 10);
})

chatUserSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

export default mongoose.model('chatUser', chatUserSchema);