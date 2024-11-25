const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    village:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    }
})

const UserModel = new mongoose.model("users",UserSchema);
module.exports = UserModel;