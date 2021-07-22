const mongoose = require('mongoose');

const preInspectionSchema = new mongoose.Schema({

    userID:{
        type:String
    },
    data:{},
    sprayerID:{
        type:String
    },
    date:{
        type:Date
    }
});


module.exports = mongoose.model("Pre Inspection",preInspectionSchema, "Pre Inspections");