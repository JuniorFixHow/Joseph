const Supplier = require("../models/supplierModel");
const { createError } = require("../utils/error");

const createSupplier =async(req, res, next)=>{
    try {
        const newProd = new Supplier(req.body);
        const savedProd = await newProd.save();
        res.status(200).json(savedProd);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateSupplier = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const upSupplier = await Supplier.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json(upSupplier);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteSupplier = async(req, res, next) =>{
    const {id} = req.params;
    try {
        await Supplier.findByIdAndDelete(id);
        res.status(200).json('Supplier deleted successfflly');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getSupplier = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const pass = await Supplier.findById(id);
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllSuppliers = async(req, res, next) =>{
    try {
        const passes = await Supplier.find({});
        res.status(200).json(passes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplier,
    getAllSuppliers
}