//Models

const CustomerModel = require("../models/customer.model");

//Lirbaries
const fs=require("fs")
const path = require("path")

exports.postCustomer = async(req,res)=>{

   var customer =  await CustomerModel.create(req.body)
   res.send({error:null,customer:customer});
}

exports.getAllCustomers = async(req,res)=>{
    var customers = await CustomerModel.find();

    res.send({error:null,customers:customers});
}

exports.getCustomers = async(req,res)=>{
    var customers = await CustomerModel.find(req.query);


    res.send({error:null,customers:customers});
}

exports.getCustomer = async(req,res)=>{
    var customer = await CustomerModel.findOne({_id:req.params.customerID});

    res.send({error:null,customer:customer});
}

exports.updateCustomer = async(req,res)=>{
    await CustomerModel.updateOne({_id:req.params.customerID},req.body);

    res.send({error:null});
}

exports.createCustomersCSV = async(req,res)=>{
    console.log(req.body.userID)
    var customers = await CustomerModel.find({userID:req.body.userID})
    
    fs.appendFileSync(path.join(__dirname,"../tmp","customers.csv"),"name,surname,fathername,AFM,address,phone,email",{encoding: 'utf8'});

    for(var c of customers){
        var data = [c.name,c.surname,c.fatherName,c.AFM,c.address,c.phone,c.email]

        fs.appendFileSync(path.join(__dirname,"../tmp","customers.csv"),"\n" + data.join(","),{encoding: 'utf8'})

       
    }
    res.sendFile(path.join(__dirname,"../tmp","customers.csv"))
}