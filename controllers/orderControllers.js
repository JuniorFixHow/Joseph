const Order = require("../models/ordersModel");
const Supplier = require("../models/supplierModel");
const { createError } = require("../utils/error");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

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
        console.log('Ready for order messages');
        console.log(success);
    }
})

let mailOptions;

const createOrder =async(req, res, next)=>{

    try {
        const {name, sup, quantity, desc} = req.body;
        const user =await Supplier.findById(sup);
        
        mailOptions = {
            from: process.env.EMAIL,
            to:user.email,
            subject: 'New Order - KANBAN',
            html: `
            <div >
                <h1>${quantity} units of ${name} needed</h1>
                <h3>We are notifying you that we've run out of ${name}</h3>
                <p>
                   ${desc}</br>
                </p>
            </div>    
        `
        }
        const newOrd = new Order(req.body);
        const savedOrd = await newOrd.save();
        res.status(200).json('Product ordered');
        transporter.sendMail(mailOptions, ()=>{
            console.log('Ordered')
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const cancelOrder = async(req, res, next)=>{
    const {name, sup, quantity} = req.body;
    const user = await Supplier.findById(sup);
    // const product = await Order.findOne({name});
    mailOptions = {
        from: process.env.EMAIL,
        to:user.email,
        subject: 'Attention - KANBAN',
        html: `
        <div >
            <h1>Order cancelled for ${name}</h1>
            <h3>We want to draw your attention that we have declined our order for ${quantity} units of ${name}</h3>
            <p>
                Thank you</br>
            </p>
        </div>    
    `
    }
    try {
        await Order.findOneAndDelete({name});
        res.status(200).json('Order cancelled');
        transporter.sendMail(mailOptions, ()=>{
            console.log('Order declined');
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const updateOrder = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const upOrder = await Order.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json(upOrder.sup.email);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteOrder = async(req, res, next) =>{
    const {id} = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json('Order deleted successfflly');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getOrder = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const pass = await Order.findById(id);
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllOrders = async(req, res, next) =>{
    try {
        const passes = await Order.find({}).populate('sup');
        res.status(200).json(passes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrders,
    cancelOrder
}