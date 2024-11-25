const mongoose = require('mongoose');

const CartProductSchema = new mongoose.Schema({
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
    product_id:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    userid:{
        type:String,
        require:true
    }
})

const CartProductModel = new mongoose.model("cart_products", CartProductSchema);

module.exports = CartProductModel;