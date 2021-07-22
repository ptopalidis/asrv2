const mongoose = require('mongoose');

const sprayerSchema = new mongoose.Schema({
    
    userID:{
        type:String
    },
    customers:[{
        customerID:{
            type:String
        },
        ownershipPercentage:{
            type:Number
        },
        isMainOwner:{
            type:Boolean
        }
    }],
    categoryID:{
        type:String
    },
    movementType:{
        type:String
    },
    manufacturer:{
        type:String
    },
    commercialName:{
        type:String
    },
    serialNumber:{
        type:String
    },
    region:{
        type:String
    },
    age:{
        type:Number
    },
    ceCompliance:{
        type:Boolean
    },
    tanksNumber:{
        type:Number
    },
    totalTanksCapacity:{
        type:Number
    },
    totalArmLength:{
        type:Number
    },
    maxPressure:{
        type:Number
    },
    branches:[{
        injectors:[{
            nozzles:[{
                flow:{
                    type:Number
                }
            }]
        }]
    }]

});


module.exports = mongoose.model("Sprayer",sprayerSchema, "Sprayers");