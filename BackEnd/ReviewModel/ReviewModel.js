const mongoose = require('mongoose');

const Customer_review_Schema = new mongoose.Schema({
    customer_name:{
        type:String,
        require:true
    },
    customer_phone:{
        type:String,
        require:true
    },
    customer_email:{
        type:String,
        require:true
    },
    customer_review:{
        type:String,
        require:true
    }
})

const Customer_review_Model = new mongoose.model('reviews', Customer_review_Schema);

module.exports = Customer_review_Model;