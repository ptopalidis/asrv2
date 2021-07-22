//Models
const sprayerModel = require("../models/sprayer.model");



exports.postSprayer = async(req,res)=>{
    const sprayer = await sprayerModel.create(req.body);

    res.send({error:null,sprayer:sprayer});
}

exports.getSprayer = async(req,res) =>{

    await sprayerModel.findOne({_id:req.params.sprayerID},(error,sprayer)=>{
        if(error){
            res.send({error:"Ο ψεκαστήρας δεν βρέθηκε."});
            return;
        }
        res.send({error:null,sprayer:sprayer})
    })

}

exports.updateSprayer = async(req,res)=>{
    await sprayerModel.updateOne({_id:req.params.sprayerID},req.body,(error,sprayer)=>{
        if(error){
            res.send({error:"Υπήρξε ένα πρόβλημα."});
            return;
        }
        res.send({error:null,sprayer:sprayer})
    })
}

exports.getSprayers = async(req,res)=>{
    await sprayerModel.find(req.query,(error,sprayers)=>{
        if(error){
            res.send({error:"Υπήρξε ένα πρόβλημα."});
            return;
        }
        res.send({error:null,sprayers:sprayers})
    })
}