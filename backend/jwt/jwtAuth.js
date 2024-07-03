const jwt = require('jsonwebtoken');
const { decode } = require('punycode');
const JWT_KEY = 'myjwtkey'

const verifyToken = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(403).json({ 'status':false , message: 'Token is required!' });
    }
    jwt.verify(token,JWT_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).json({ 'status':false,message: 'Invalid token!' });
        }
        req.user = decoded
        next();
    })
}

// const verifyLogin = (req,res,next)=>{
//     const token = req.headers['authorization']
//     if(token)
// }


module.exports = {verifyToken}