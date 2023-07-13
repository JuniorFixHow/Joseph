const Product = require("../models/productModel");
const Sale = require("../models/salesModel");
const { createError } = require("../utils/error");

const createSale =async(req, res, next)=>{
    try {
        const {product, quantity} = req.body;
        const item = await Product.findOne({name:product});
        // console.log(item)
        if(!item){
            return next(createError(404, `There's no such product!`))
        }
        else if(item.quantity ===0){
            return next(createError(400, `You do not have ${product} in stock`))
        }
        else if(item.quantity < quantity){
            return next(createError(400, `You have insufficient ${product} in stock`))
        }
        else{
            const quant = item.quantity - quantity;
            const p = item.price * quantity;
            const newProd = new Sale({...req.body, price:p});
            const savedProd = await newProd.save();
            await Product.updateOne({name:product}, 
                {$set:{quantity:quant} }
            )
            res.status(200).json('Transaction posted');
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateSale = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const {product, quantity} = req.body;
        const item = await Product.findOne({name:product});
        if(quantity !== ''){

            const quant = item?.quantity - quantity;
            // console.log(quant)
            if(!item){
                return next(createError(404, `There's no such product as ${product} in stock`));
            }
            else if(item?.quantity ===0){
                return next(createError(400, `You do not have ${product} in stock`));
            }
            else if(item?.quantity < quantity){
                return next(createError(400, `You have insufficient ${product} in stock`))
            }
            else{
                const p = item.price * quantity;
                const upSale = await Sale.findByIdAndUpdate(id, 
                    {$set: {...req.body, price:p}}, {new:true}
                );
                await Product.findByIdAndUpdate(item.id, 
                    {$set: {...req.body, quantity:quant}}, {new:true}
                );
                res.status(200).json('Transaction edited');
            }
        }
        else{
            const upSale = await Sale.findByIdAndUpdate(id, 
                {$set: req.body}, {new:true}
            );
            res.status(200).json('Transaction edited');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteSale = async(req, res, next) =>{
    const {id} = req.params;
    try {
        await Sale.findByIdAndDelete(id);
        res.status(200).json('Sale deleted successffully');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getSale = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const pass = await Sale.findById(id);
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllSales = async(req, res, next) =>{
    try {
        const passes = await Sale.find({}).populate('seller');
        res.status(200).json(passes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createSale,
    updateSale,
    deleteSale,
    getSale,
    getAllSales
}