//Models
const inspectionModel = require("../models/inspection.model");
const preInspectionModel = require("../models/preInspection.model");
const sprayerModel = require("../models/sprayer.model")
const customerModel = require("../models/customer.model")
const categoryModel = require("../models/category.model")

//Libraries
const fs = require("fs")
const path = require("path");


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


exports.getInspectionsWithData = async(req,res)=>{
    console.log(req.query)
    var limit = Number(req.query.limit)
    var page = Number(req.query.page)
    var filters = await parseFilters(req)
    console.log(filters)
    var inspectionsWithData = []
    try{
        var inspections = await inspectionModel
      
        .find(filters)
        .limit(limit)
        .skip( page*limit)

        for(var ins of inspections){
            var currPreInspection = await preInspectionModel.findOne({_id:ins.preInspectionID});
            var currSprayer = currPreInspection?await sprayerModel.findOne({_id:currPreInspection.sprayerID}):null
            var customerIDs = currSprayer?currSprayer.customers.map(e=>e.customerID):[]
            var currCustomers = await customerModel.find({_id:{$in:customerIDs}})
            var currCategory = currSprayer?await categoryModel.findOne({_id:currSprayer.categoryID}):null
            inspectionsWithData.push({
                inspection:ins,
                preInspection:currPreInspection,
                sprayer:currSprayer,
                customers:currCustomers,
                category:currCategory
            })
      
        }
       

        var inspectionsNumber =  await inspectionModel.count(filters);

        console.log(inspectionsNumber)

        res.send({error:null,inspections:inspectionsWithData,number:inspectionsNumber})
    }
    catch(e){
        if(e){
            console.log(e)
            res.send({error:"Υπήρξε ένα πρόβλημα."})
        }
    }

}

exports.getInspections = async(req,res)=>{
    console.log(req.query)
    var limit = Number(req.query.limit)
    var page = Number(req.query.page)
    var filters = await parseFilters(req)
    console.log(filters)
    try{
        var inspections = await inspectionModel
      
        .find(filters)
        .limit(limit)
        .skip( page*limit)
       

        var inspectionsNumber =  await inspectionModel.count(filters);

        console.log(inspectionsNumber)

        res.send({error:null,inspections:inspections,number:inspectionsNumber})
    }
    catch(e){
        if(e){
            console.log(e)
            res.send({error:"Υπήρξε ένα πρόβλημα."})
        }
    }

}

exports.getTotalInspectionsNumber = async(req,res)=>{
    var inspectionsNumber  = await inspectionModel.count(req.body.filters);
    res.send({error:null,inspectionsNumber:inspectionsNumber})
}


exports.getRegionByInspectionID = async (req,res)=>{
    console.log("req")
    var inspection = await inspectionModel.findOne({_id:req.params.inspectionID})
    var preInspection = await preInspectionModel.findOne({_id:inspection.preInspectionID});
    var sprayer = await sprayerModel.findOne({_id:preInspection.sprayerID});

    res.send({region:sprayer.region})
}


exports.generateInspectionsReportWeb= async(req,res)=>{
    console.log(req.query)

    var filters = await parseFilters(req)
    console.log(filters)
    try{
        var inspections = await inspectionModel  
        .find(filters)
        res.send({error:null,inspections:inspections,number:inspectionsNumber})
    }
    catch(e){
        if(e){
            console.log(e)
            res.send({error:"Υπήρξε ένα πρόβλημα."})
        }
    }


    
}

exports.generateInspectionsReportCSV= async(req,res)=>{
    var filters = await parseFilters(req)

    console.log(filters)
    try{
        var inspections = await inspectionModel  
        .find(filters)

        console.log(req.body.userID)
 
        fs.writeFileSync(path.join(__dirname,"../tmp","inspections.csv"),"")
        fs.appendFileSync(path.join(__dirname,"../tmp","inspections.csv"),"Αριθμός επιθεώρησης,Ονοματεπώνυμο,ΑΦΜ,Τηλέφωνο,Κατηγορία ΕΕΓΦ,Τύπος Κίνησης,Αριθμός σειράς,Κατασκευαστής,Εμπορική ονομασία,Παλαιότητα (έτη), Δήλωση πιστότητας (CE),Αριθμός δεξαμενών,Χωρητικότητα δεξαμενής (lt), Αριθμος μπεκ, Μήκος βραχιόνων (m),Ημερομηνία επιθεώρησης,Περιφεριακή ενότητα, Αριθμός sticker,Πιστοποιητικό",{encoding: 'utf8'});

        for(var i of inspections){
            var currPreInspection = await preInspectionModel.findOne({_id:i.preInspectionID})
            var currSprayer = await sprayerModel.findOne({_id:currPreInspection.sprayerID})
            var currCategory = await categoryModel.findOne({_id:currSprayer.categoryID})
            var customers = [];

            for(var c of currSprayer.customers){
                var currCustomer = await customerModel.findOne({_id:c.customerID})
                if(currCustomer){
                    customers.push(currCustomer)
                }
            }
            var inspectionData=[
                i.inspectionNumber,
                customers.map(c=>c.name + " " + c.surname).join("|"),
                customers.map(c=>c.AFM).join("|"),
                customers.map(c=>c.phone).join("|"),
                currCategory.name,
                currSprayer.movementType,
                currSprayer.serialNumber,
                currSprayer.manufacturer,
                currSprayer.commercialName,
                currSprayer.age,
                currSprayer.ceCompliance?"ΝΑΙ":"ΟΧΙ",
                currSprayer.tanksNumber,
                currSprayer.totalTanksCapacity,
                currSprayer.branches.reduce((a,b)=>a + b.injectors.length,0),
                currSprayer.totalArmLength,
                new Date(i.date).toDateString(),
                currSprayer.region,
                i.stickerNumber,
                "https://asrv2.com/inspections/" + i._id + "/report?userID" + filters.userID
            ]
            res.charset = 'utf8';
            fs.appendFileSync(path.join(__dirname,"../tmp","inspections.csv"),"\n" + inspectionData.join(","),{encoding: 'utf8'});
        }

        res.sendFile(path.join(__dirname,"../tmp","inspections.csv"))
    }
    catch(e){
        if(e){
            console.log(e)
            res.send({error:"Υπήρξε ένα πρόβλημα."})
        }
    }


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

async function parseFilters(req){

    var filters = {}
    var preInspections = [];
    var sprayersFilter = { userID:req.body.filters.userID};

    if(req.body.filters.userID){
        filters.userID = req.body.filters.userID
    }
    
    if(req.body.filters.customerID){
        sprayersFilter = {...sprayersFilter,customers:{
            $elemMatch:{
                customerID:req.body.filters.customerID
            }
        }};
    }
    if(req.body.filters.region){
        sprayersFilter={...sprayersFilter,region:req.body.filters.region}
    }
    if(req.body.filters.customerID || req.body.filters.region){
        console.log(sprayersFilter)
        var sprayers = await sprayerModel.find(sprayersFilter)

        for(var s of sprayers){
            var currPreInspection = await preInspectionModel.findOne({sprayerID:s._id,userID:filters.userID});
            if(currPreInspection){
                preInspections.push(currPreInspection._id)
            }
        }

        
        filters.preInspectionID = {$in:preInspections}
    }
      
    if(req.body.filters.stickerNumber){
       filters.stickerNumber = req.body.filters.stickerNumber
    }
    if(req.body.filters.inspectionNumber){
        filters.inspectionNumber = req.body.filters.inspectionNumber
    }   
    if(req.body.filters.dateRange){
        filters.date = {
            $gte: new Date(req.body.filters.dateRange[0]).setHours(0,0,0,0), 
            $lt: new Date(req.body.filters.dateRange[1]).setHours(24,0,0,0)
        }
    }

    return filters;
}