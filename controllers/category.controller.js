//Models
const categoryModel = require("../models/category.model");

exports.getCategory= async(req,res) =>{

    await categoryModel.findOne({_id:req.params.categoryID},(error,category)=>{
        if(error){
            res.send({error:"Η κατηγορία δεν βρέθηκε."});
            return;
        }
        res.send({error:null,category:category})
    })

}

exports.getAllCategories = async(req,res)=>{
    var categories = await categoryModel.find();


    res.send({error:null,categories:categories});
}