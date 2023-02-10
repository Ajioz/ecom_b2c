import bcrypt from 'bcryptjs'

const users = [
 {
    name: "Admin",
    email:"hubsandy@gmail.com",
    password:bcrypt.hashSync("sandiewhyte", 10),
    isAdmin:true
 },
 {
    name: "Admin",
    email:"sunny@ajiozi.com",
    password:bcrypt.hashSync("expertiniot1!", 10),
 },
];

export default users;
