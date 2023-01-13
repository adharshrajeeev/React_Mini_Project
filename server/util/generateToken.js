const jwt= require('jsonwebtoken')


const generateToken=(id)=>{
    return jwt.sign({id},"secret123",{expiresIn:"5d"})
}


module.exports=generateToken;