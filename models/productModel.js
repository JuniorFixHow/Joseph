const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    cat:{
        type:String,
        default:null
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    cost:{
        type:Number,
    },
   
    pic:{
        type:String,
        default:'https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png'
    },

    minQuant:{
        type:Number,
        default:5
    },
    desc:{
        type:String,
    }
    
}, 
{ timestamps:true}
)

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;