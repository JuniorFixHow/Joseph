const Product = require("../models/productModel");
const { createError } = require("../utils/error");

const createProduct =async(req, res, next)=>{
    try {
        const {name, quantity} = req.body;
        const product = await Product.findOne({name});
        // console.log('This is the quantity: '+product[0].quantity)
        if(product){
            const quant = product.quantity + quantity;
            const upPro = await Product.updateOne({name}, 
                {$set:{quantity:quant}, }
            )
            res.status(200).json('Stock increased');
        }
        else{
            const newProd = new Product(req.body);
            const savedProd = await newProd.save();
            res.status(200).json('Stock added');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateProduct = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const upProduct = await Product.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json(upProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteProduct = async(req, res, next) =>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json('Product deleted successfflly');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getProduct = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const pass = await Product.findById(id);
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllProducts = async(req, res, next) =>{
    try {
        const passes = await Product.find({});
        res.status(200).json(passes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}