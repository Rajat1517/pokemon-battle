const jwt = require("jsonwebtoken");
require("dotenv").config();
const uniqid= require("uniqid");

const generateJWT= ()=>{
    const player_id= uniqid();
    const payload= {
        player_id,
    };

    const options= {
        expiresIn: '1h',
    }

    return jwt.sign(payload,process.env.SECRET_KEY, options);
}


const verifyJWT= (token)=>{
    try{
        const data= jwt.verify(token,process.env.SECRET_KEY);
        return {success: true, data};
    }catch(error){
        return {success: false, error: error.message}
    }
}

module.exports={
    generateJWT,
    verifyJWT,
}