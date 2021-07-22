const UserModel = require("../models/user.model");


exports.postUserLogin = async(req,res)=>{

    var user = await UserModel.findOne({username:req.body.username});

    if(!user){
        res.send({error:"Λάθος όνομα χρήστη"});
        return;
    }

    if(user.password == req.body.password){
        res.send({error:null,user:user});
    }
    else{
        res.send({error:"Λάθος κωδικός"})
    }
}


exports.getUser = async(req,res)=>{
    var user = await UserModel.findOne({_id:req.params.userID});

    if(!user){
        res.send({error:"Υπήρξε ένα πρόβλημα με την εύρεση του χρήστη. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε με τον προγραμματιστή."})
    }

    res.send({error:null,user:user});
}

exports.updateUser = async(req,res)=>{

    await UserModel.updateOne({_id:req.params.userID},req.body);


}


exports.setAllUsersPaid = async (req,res)=>{
    await UserModel.updateMany({},{paid:true});
    console.log("updated")
}