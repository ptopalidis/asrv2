//Models
const categoryModel = require("../models/category.model");

exports.getCategory= async(req,res) =>{
    try{
        if(!req.params.categoryID){
            res.send({error:"Υπήρξε πρόβλημα με την εύρεση μιας κατηγορίας",category:null})
            return;
        }
        var category  = await categoryModel.findOne({_id:req.params.categoryID});
        if(!category){
            res.send({error:"Η κατηγορία " + req.params.categoryID +" δεν βρέθηκε",category:null})
            return
        }
   
    }
    catch(e){
        res.send({error:"Υπήρξε πρόβλημα με την εύρεση μιας κατηγορίας",category:null})
        return;
    }


}

exports.getAllCategories = async(req,res)=>{
    var categories = await categoryModel.find();


    res.send({error:null,categories:categories});
}