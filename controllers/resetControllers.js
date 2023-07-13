const PasswordReset = require("../models/passwordResetModel");
const User = require("../models/userModel");
const { createError } = require("../utils/error");


const createPasswordReset =async(req, res, next)=>{
    try {
        const {email} = req.body;
        const user = await User.find({email});
        if(!user.length){
            next(createError(404, "Email does not exist"))
        }
        else{
            const newReq = new PasswordReset(req.body);
            const savedReq = await newReq.save();
            res.status(200).json('Password reset request sent');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updatePasswordReset = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const upPasswordReset = await PasswordReset.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json(upPasswordReset);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deletePasswordReset = async(req, res, next) =>{
    const {email} = req.body;
    try {
        await PasswordReset.deleteMany({email});
        res.status(200).json('Password reset request deleted successfflly');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getPasswordReset = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const pass = await PasswordReset.findById(id);
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllPasswordResets = async(req, res, next) =>{
    try {
        const passes = await PasswordReset.find({});
        res.status(200).json(passes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createPasswordReset,
    updatePasswordReset,
    deletePasswordReset,
    getPasswordReset,
    getAllPasswordResets
}