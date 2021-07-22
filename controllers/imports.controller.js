const customerModelOld = require('../models/old/customer.model');
const customerModel = require("../models/customer.model")
const dbConnect = require('../middlewares/dbConnect');


const csv = require('csv-parser')
const fs = require('fs')


exports.getOldCustomers = async(req,res)=>{
    await dbConnect(process.env.DB_URI_OLD);
    var userID = "60dd67bb83c89752d4fe529b"
    await customerModelOld.find({IDNumber:req.params.IDNumber},(err,customers)=>{
        customers = customers.map(c=>{
       
            return{
                userID:userID,
                name:c.name.split(" ")[1],
                surname:c.name.split(" ")[0],
                fatherName:c.fatherName,
                AFM:c.AFM,
                address:c.address + ", " + c.city,
                phone:c.phone,
                email:c.email
            }
        })

        //fs.writeFileSync('./dogouliscustomers.json', JSON.stringify(customers), 'utf8');
        
        var customersParsed =  JSON.parse(fs.readFileSync('./dogouliscustomers.json', 'utf8'));
        console.log(customersParsed)
        
    })
}


exports.importCustomers = async(req,res)=>{
    var customersParsed =  JSON.parse(fs.readFileSync('./dogouliscustomers.json', 'utf8'));

    for(var c of customersParsed){
        await customerModel.create(c,(err,customer)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Imported: " + customer.name + " " + customer.surname)
            }
        })
    }

}


exports.deleteAllCustomers = async(req,res)=>{
    await customerModel.deleteMany({userID:"60dd67bb83c89752d4fe529b"})
}