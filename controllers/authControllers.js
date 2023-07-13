const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const { createError } = require('../utils/error');
const jwt = require('jsonwebtoken');

const makeid=(length)=> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
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
        console.log('Ready for messages');
        console.log(success);
    }
})


const createUser = async(req, res, next)=>{
    const {email, fullname} = req.body;
    const pass = makeid(8);

    const mailOptions = {
        from: process.env.EMAIL,
        to:email,
        subject: 'Account Completion',
        html: `
        <div >
            <h1>Hi ${fullname}</h1>
            <h3>You are welcome to KANBAN </h3>
            <p>
                You can login with the following credentials</br>
               <h4>
                Email: 
                 <b>${email}</b>
               </h4>
               </br>
    
               <h4>
                Password: 
                 <b>${pass}</b>
               </h4>
            </p>
        </div>    
       `
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        // console.log(hash)

        const users = await User.find({email});
        if(users.length){
            return next(createError(422, 'Email already exists'));
        }
        else{
            const newUser = new User({
                ...req.body,
                password:hash
            });
            
            try {
                const savedUser = await newUser.save();
                res.status(200).json("Email sent to user's mail");
                transporter.sendMail(mailOptions, ()=>{
                    console.log('Email sent')
                });
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const login = async(req, res, next) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(createError(404, "Incorrect email or password!"));
        }
        const isUser = await bcrypt.compare(req.body.password, user.password);
        if(!isUser){
            return next(createError(400, "Incorrect email or password!")); 
        }
        else{
            const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);
            const { password,  isAdmin, ...otherDetails} = user._doc;
            res.cookie("access_token", token, 
            {
                httpOnly:true,
                // signed: true,
                // sameSite:'none'
            }
            )
            .status(200).json({details:{...otherDetails}, isAdmin});
        }
    } catch (error) {
        console.log(error);
        return next(createError(500, 'Error occured trying to login. Retry'))
    }
}


module.exports = {
    createUser,
    login
}