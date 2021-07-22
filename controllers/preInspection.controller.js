//Models
const preInspectionModel = require("../models/preInspection.model");



exports.postPreInspection = async(req,res)=>{
    console.log(req.body)
    await preInspectionModel.create(req.body,(error,preInspection)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null,preInspection:preInspection});
    })
}

exports.getPreInspection = async(req,res)=>{
    await preInspectionModel.findOne({_id:req.params.preInspectionID},(error,preInspection)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null,preInspection:preInspection});
    })
}

exports.updatePreInspection = async(req,res)=>{
    console.log(req.body)
    await preInspectionModel.updateOne({_id:req.params.preInspectionID},req.body,(error)=>{
        if(error){
            console.log(error)
            res.send({error:error})
            return
        }

        res.send({error:null});
    })
}


exports.getPreInspections = async(req,res)=>{
    await preInspectionModel.find(req.query,(error,preInspections)=>{
        if(error){
            res.send({error:"Υπήρξε ένα πρόβλημα."});
            return;
        }
        res.send({error:null,preInspections:preInspections})
    })
}