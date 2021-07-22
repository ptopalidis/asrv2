const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

    userID:{
        type:String
    },
    preInspectionID:{
        type:String
    },
    technicalReport:{},
    measurements:{},
    date:{
        type:Date
    },
    type:{
        type:String
    },
    inspectionNumber:{
        type:String
    },
    stickerNumber:{
        type:String
    },
    inadequateCategory:{
        type:Boolean
    },
    result:{
        type:Number
    }
});


module.exports = mongoose.model("Inspection",inspectionSchema, "Inspections");