//Models
const inspectionModel = require("../models/inspection.model");
const preInspectionModel = require("../models/preInspection.model");
const sprayerModel = require("../models/sprayer.model")


exports.postInspection = async(req,res)=>{
    var stickerValidation = await validateStickerNumber(req.body.stickerNumber,null,req.body.userID);
    var inspectionNumberValidation = await validateInspectionNumber(req.body.inspectionNumber,null,req.body.userID)

    if(stickerValidation.error){
        res.send({error:stickerValidation.error})
        return;
    }
    if(inspectionNumberValidation.error){
        res.send({error:inspectionNumberValidation.error})
        return;
    }
    await inspectionModel.create(req.body,(error,inspection)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null,inspection:inspection});
    })
}

exports.getInspection = async(req,res)=>{
    console.log(req.params.inspectionID)
    await inspectionModel.findOne({_id:req.params.inspectionID},(error,inspection)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null,inspection:inspection});
    })
}

exports.getInspectionByInspectionNumber = async(req,res)=>{

    console.log(req.query)

    await inspectionModel.findOne({inspectionNumber:req.query.inspectionNumber,userID:req.query.userID},(error,inspection)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }
        if(!inspection){
            console.log("Η επιθεώρηση δεν βρέθηκε")
            res.send({error:"Η επιθεώρηση δεν βρέθηκε"})
            return 
        }

        res.send({error:null,inspection:inspection});
    })
}

exports.updateInspection = async(req,res)=>{
    var stickerValidation = await validateStickerNumber(req.body.stickerNumber,req.body._id);
    var inspectionNumberValidation = await validateInspectionNumber(req.body.inspectionNumber,req.body._id)

    console.log(stickerValidation)
    if(stickerValidation.error){
        res.send({error:stickerValidation.error})
        return;
    }
    if(inspectionNumberValidation.error){
        res.send({error:inspectionNumberValidation.error})
        return;
    }
    await inspectionModel.updateOne({_id:req.params.inspectionID},req.body,(error)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null});
    })
}


exports.getInspections = async(req,res)=>{
    await inspectionModel.find(req.query,(error,inspections)=>{
        if(error){
            res.send({error:"Υπήρξε ένα πρόβλημα."});
            return;
        }
        res.send({error:null,inspections:inspections})
    })
}

exports.getRegionByInspectionID = async (req,res)=>{
    console.log("req")
    var inspection = await inspectionModel.findOne({_id:req.params.inspectionID})
    var preInspection = await preInspectionModel.findOne({_id:inspection.preInspectionID});
    var sprayer = await sprayerModel.findOne({_id:preInspection.sprayerID});

    res.send({region:sprayer.region})
}



async function validateStickerNumber(stickerNumber, inspectionID,userID){
    console.log(userID)
    if(stickerNumber==""){
        return {error:null}
    }
    if(stickerNumber.length>4){
        return {error:"Ο αριθμός sticker πρέπει να αποτελείται από 4 μόνο ψηφία"};
   
    }
    var inspection = await inspectionModel.findOne({stickerNumber:stickerNumber,userID:userID});
    if(inspection && inspection._id!=inspectionID){
        return {error:"Αυτός ο αριθμός sticker υπάρχει ήδη"};
    }
    else{
        return {error:null}
    }

}

async function validateInspectionNumber(inspectionNumber,inspectionID,userID){
    console.log(userID)
    if(inspectionNumber.length>4){
        return {error:"Ο αριθμός επιθεώρησης πρέπει να αποτελείται από 4 μόνο ψηφία"};
   
    }
    var inspection = await inspectionModel.findOne({inspectionNumber:inspectionNumber,userID:userID});
    if(inspection && inspection._id!=inspectionID){
        return {error:"Αυτός ο αριθμός επιθεώρησης υπάρχει ήδη"};
    }
    else{
        return {error:null}
    }

}