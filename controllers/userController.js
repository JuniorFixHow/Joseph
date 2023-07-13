const User = require("../models/userModel");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

dotenv.config();

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

transporter.verify((error, success)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('Ready for reset messages');
        console.log(success);
    }
})

let mailOptions;
const changePassword = async(req, res, next)=>{
    const {email, password} = req.body;
    const {id} = req.params;
    // console.log(email)
    try {
        const user = await User.findById(id);
        console.log('user is ', user);
        mailOptions = {
            from: process.env.EMAIL,
            to:user.email,
            subject: 'Password Reset - KANBAN',
            html: `
            <div >
                <h1>Hi ${user.fullname}</h1>
                <h3>You password has been reset. Your new password is: ${password} </h3>
                <p>
                    Thank you</br>
                </p>
            </div>    
        `
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        try {
            const upUser = await User.findOneAndUpdate({email}, 
                {$set:{password:hash}}, {new:true}
            )
            
            res.status(200).json('Password reset successfully');
            transporter.sendMail(mailOptions, ()=>{
                console.log('Password reset successfully');
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const updateUser = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const upUser = await User.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json('Profile updated!');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteUser = async(req, res, next) =>{
    const {id} = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json('User deleted successfflly');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUser = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllUsers = async(req, res, next) =>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    changePassword
}