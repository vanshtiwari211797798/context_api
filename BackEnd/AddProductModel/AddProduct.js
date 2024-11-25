const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    old_price:{
        type:Number,
        require:true
    },
    offer_price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    product_id:{
        type:Number,
        require:true
    }
})

const ProductModel = new mongoose.model("products", ProductSchema);
module.exports = ProductModel;