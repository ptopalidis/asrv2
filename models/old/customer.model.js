const mongoose = require('mongoose');

const customerSchemaOld = new mongoose.Schema({
    
    IDNumber:{
        type:String
    },
    name:{
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
    city:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    }
});


module.exports = mongoose.model("CustomerOld",customerSchemaOld, "Customers");