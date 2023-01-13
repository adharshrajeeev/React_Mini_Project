const mongoose=require('mongoose');



const User= new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String}
},
{ collection:'users'}
)


const model=mongoose.model('UserData',User);


module.exports=model