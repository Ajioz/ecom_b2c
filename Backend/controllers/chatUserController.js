import dotenv from 'dotenv'
dotenv.config();
import onlineModel from "../models/onlineModel.js";
import ChatUser from "../models/chatUserModel.js"; 
import Chats from "../models/chatModel.js";
import nodemailer from 'nodemailer';


let config = {
    service : 'gmail',
    auth : {
        user: process.env.EMAIL2,
        pass: process.env.APP_PASSWORD
    }
}

const transporter = nodemailer.createTransport(config);

/*    01  Send multi Mails method  */
const sendEmail = (subject, email, message, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL2,
        to: ["sandiewhyte5@gmail.com", email],
        subject,
        text: message
    };
    transporter.sendMail(mailOptions , cb);
}

// Register User
export const register = async(req, res) => {
    let {username, email, message  } = req.body;
    message = `${message} \nYou can reach me at ${email}\n\nWarmest regards,\n\n\n${username}` 
    let password = "adhocUser";
    let subject = `Hi, ${username} visited and left you a message`;
    let avatarImage = process.env.SVG;
    try {
        let findEmail = await ChatUser.findOne({ email });
        if ( findEmail ) return res.json({ msg: "Invalid Email", status: false });
        let user = await ChatUser.create({email, username, password, avatarImage, isAvatarImageSet:true });
        let user_status = await onlineModel.create({ online:true, user: user._id } )
        delete user.password;
        sendEmail(subject, email, message, (err, data) => {
            if(err){
                console.error({err, msg: 'Internal Error'});
                return res.status(500).json({err, message: 'Internal Error'});
            }else{
               return res.status(200).json({data, Message: 'Email Sent!!!'});
            }
        });
        return res.status(201).json({status: true, user, isOnline: user_status})   
    } catch (error) {
        console.log({ status: false, msg: "Failed to create user", error});
        return res.status(500).json({ status: false, msg: "Failed to create user"})
    }
}


// User Login
export const login = async(req, res) => {
    const {username, password} = req.body;
    try {
        let user = await ChatUser.findOne({ username });
        let isOnline = await onlineModel.findOne({user})
        if(user &&  (await user.matchPassword(password))){
            isOnline.online = true;
            isOnline.save();
            delete user.password;
            return res.status(200).json({status: true, user, isOnline: isOnline.online })   
        }else {
            return res.json({ msg: "Incorrect username or password", status: false});
        }
    } catch (error) {
        console.log({ status: false, msg: "Failed to create user" , error });
        return res.status(500).json({ status: false, msg: "Failed to create user" })
    }
}


// helper method
const compare_update_objects = (users, onlines) => {
    let my_list = []
    users.map((user) => {
        onlines.map((item) => {
          if(JSON.stringify(user._id ) === JSON.stringify(item.user)){
            user.online = item.online
            my_list.push(user)
          }
        })
    });
    return my_list;
}


// Get Users on chat
export const getUsers = async(req, res, next) => {
    try {
        let isOnline = await onlineModel.find({}).sort({_id: -1});
        const users = await ChatUser.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        compare_update_objects(users, isOnline);
        return res.status(200).json(users)
    } catch (error) {
        console.log({ status: false, msg: "Failed to create user", error });
        return res.status(500).json({ status: false, msg: "Failed to create user" })
    }
}


// Get Users on chat
export const online_users = async(req, res) => {
    try {
        let isOnline =  await onlineModel.find({}).sort({_id: -1});
        const users = await ChatUser.find({}).select([
            "email",
            "username",
            "_id"
        ])
       const result = compare_update_objects(users, isOnline);
       res.send(result);
    } catch (error) {
        console.log({ status: false, msg: "Failed to create user", error });
        return res.status(500).json({ status: false, msg: "Failed to create user" })
    }
}



// User left the chat
export const leaveChat = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.json({ msg: "User id is required " });
        const user = await ChatUser.findById(id);
        let isOnline = await onlineModel.findOne({user});
        await Chats.deleteMany({ sender: user._id });
        
        if(user.isAdmin){
            isOnline.online = false;
            isOnline.save();
        }

        if(!user.isAdmin){
            await onlineModel.findOneAndDelete({ user: user._id });
            await ChatUser.findByIdAndDelete(id);
        }

        return res.status(200).send({msg: "User left chat"});
    } catch (error) {
        console.log({ status: false, msg: "Failed to create user", error });
        return res.status(500).json({ status: false, msg: "Failed to create user" })
    }
};



export const deleteUser = async(req, res) => {
  try {

    const {id, user} = req.body;
    const userStatus = await ChatUser.findById(id);

    if(user.isAdmin){
        if(!userStatus.isAdmin){
            await Chats.deleteMany({ sender: id });
            await onlineModel.findOneAndDelete({ user: id });
            await ChatUser.findByIdAndDelete(id);
            console.log({ status: true, msg: "User deleted successfully" });
            return res.status(200).json({ status: true, msg: "User deleted successfully" });
        }else{
            console.log({ status: false, msg: "Admin Can't be deleted" });
            return res.status(401).json({ status: false, msg: "Admin Can't be deleted" });
        }
    }else{
        console.log({ status: false, msg: "You're not authorized to perform this action" });
        return res.status(401).json({ status: false, msg: "You're not authorized to perform this action" })
    }

  } catch (error) {
      console.log({ status: false, msg: "Failed to create user", error });
      return res.status(500).json({ status: false, msg: "Failed to create user" })
  }
};