const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    
    userID:{
        type:String
    },
    name:{
        type:String
    },
    surname:{
        type:String
    },
    fatherName:{
        type:String
    },
    AFM:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    region:{
        type:String
    }
});


module.exports = mongoose.model("Customer",customerSchema, "Customers");