const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
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
    user_id:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    userphone:{
        type:String,
        require:true
    },
    userstate:{
        type:String,
        require:true
    },
    userdistrict:{
        type:String,
        require:true
    },
    uservillage:{
        type:String,
        require:true
    },
    userpincode:{
        type:Number,
        require:true
    },
    order_date:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'Pending'
    }
})

const OrderModel = new mongoose.model("orders", OrderSchema);

module.exports = OrderModel