const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    
    sup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    },
    quantity:{
        type:Number,
        default:1
    },
    desc:{
        type:String,
    },
}, 
{ timestamps:true}
)

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;