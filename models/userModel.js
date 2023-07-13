const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    fullname:{
        type:String,
        required:[true, 'Full name is required']
    },
    phone:{type:String},
    password:{type:String},
    pic:{
        type:String,
        default:'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
}, 
{ timestamps:true}
)

const User = mongoose.model('User', UserSchema);
module.exports = User;