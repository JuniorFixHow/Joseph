const mongoose = require("mongoose");

const PasswordResetSchema = new mongoose.Schema({
    email:{
        type:String,
    }
},{timestamps:true})

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);
module.exports = PasswordReset;