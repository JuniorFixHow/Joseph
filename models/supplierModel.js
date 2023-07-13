const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    cat:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{type:String},
    location:{type:String},
    pic:{
        type:String,
        default:'https://icon-library.com/images/supplier-icon-png/supplier-icon-png-9.jpg'
    },
}, 
{ timestamps:true}
)

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;