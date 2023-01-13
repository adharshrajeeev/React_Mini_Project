const { json } = require('express');
const User=require('../model/userMode');
const jwt = require('jsonwebtoken')


module.exports={
    adminLoginn:async(req,res)=>{
      
        try{
            let adminData=req.body;
            let adminEmail="admin@gmail.com";
            let password="12345";
            if(adminEmail==adminData.email && password== adminData.password){
            //    console.log(adminData)
                res.json({status:"ok",admin:true})

            }else{
                res.json({status:"not Ok",error:"admin details invalid"})
            }

        }catch(err){
             res.json({status:"error",error:"oops catch error"})
        }
    },


    getAllUsers:async(req,res)=>{
        
        try{

            let users= await User.find();
            if(users){
               
                res.json({status:"ok",users:users})

            }else{
                console.log("no userrs found");
                res.json({status:"error",users:"users not found"})
            }

        }catch(err){

            res.json({status:"error",error:"Data not find"})
            console.log(err);
        }
    },


    deleteUsers:async(req,res)=>{
        try{
                console.log("ivdaaa")
                
             
                const deletUser= await User.deleteOne({_id:req.params.id});
                console.log("delete user")
                res.json({status:"ok",message:"user deleted"})
        }catch(err){
                console.log("user nto found")
                res,json({status:"error",error:"something sent wrong"})
        }
    },


    getUserDetails:async(req,res)=>{

        try{
            
            const user= await User.findOne({_id:req.params.id});
            if(!user){
                res.json({status:"error",message:"user not found"})
            }
            else{
                res.json({status:"ok",message:"user found",userData:user})
            }
        }catch(err){
                console.log("user not found with the edit id ");
                res.status(400).json({status:"error",message:"oops errror"})
        }

    },


    updateUsers:async(req,res)=>{
        try{
            const {userName,email}=req.body;
            let user=await User.findOne({email:email})
            console.log(user,"is theis is the error")
            if(user==null){
                   
                const update=await User.findOneAndUpdate({_id:req.params.id},
                    {
                        $set:{
                            userName,
                            email
                        }
                    })
                    console.log(update,"user updated")
                res.json({status:"ok",message:"user updated",userexists:false})
            }else{

                console.log("user already regsiterd")
                res.json({status:"error",message:"user already registerd",userexists:true})
            }
        }catch(err){
            console.log("update catch errror")
            res.json({status:"error",error:"update error"})
        }
    },


    adminSearchUser:async(req,res)=>{
        const username=req.params.userkey;
        try{
            const users=await User.find({
                "$or": [
                    {
                        userName: { $regex: username }
                    },
                    {
                        email: { $regex: username }
                    }
                ]
            })
            res.json({status:"ok",message:"user found",users})

        }catch(err)
        {
            res.json({status:"error",message:"no user found"})
        }
    }
}