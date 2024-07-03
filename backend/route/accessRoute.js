const express = require('express')
const router = express.Router()
const User = require('../userModel/userModel')
const jwt = require('jsonwebtoken');
const JWT_KEY = 'myjwtkey'

router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try{
        const user = await User.findOne({
            where: {
              username: username,
            },
          });
        if (password === user.get('password')){
            const token = jwt.sign({ username: username }, JWT_KEY, { expiresIn: '1h' });
            res.json({ token ,status:true});
        }
        else{
            res.status(201).json({
                status:false,
                error:'password does not match or user not found'
            })
        }
    }
    catch(error){
        console.log('error at finding the user',error)
        res.json({
            status:false,
            error:error
        })
    }
})

router.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    try{
        const newUser = await User.create({username,password})
        res.json({"status":true})
    }
    catch(error){
        console.log("error at creating user",error)
        res.json({status:false,error:'Internal Server Error'+error})
    }
})
router.get('/signup',(req,res)=>{
    res.send("signup")
})


module.exports = router