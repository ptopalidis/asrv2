const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type:String,
        required:[true,"The username is required."]
    },
    password: {
        type:String,
        required:[true,"The password is required."]
    },
    IDNumber:{
        type:String
    },
    name:{
        type:String
    },
    field:{
        type:String
    },
    region:{
        type:String
    },
    stationType:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    zipCode:{
        type:String
    },
    AFM:{
        type:String
    },
    DOI:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    inspector:{
        type:String
    },
    sticker:{
        type:String 
    },
    logo:{
        type:String
    },
    subscription:{
        type:Date
    },
    paid:{
        type:Boolean
    }
});


module.exports = mongoose.model("User",userSchema, "Users");