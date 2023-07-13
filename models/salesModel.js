const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
    product:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    customer:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
}, 
{ timestamps:true}
)

const Sale = mongoose.model('Sale', SaleSchema);
module.exports = Sale;