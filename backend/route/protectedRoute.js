const express = require('express');
const {verifyToken} = require('../jwt/jwtAuth')
const router = express.Router()
const list = require('../userModel/listModel')


router.get('/todolist',verifyToken,async(req,res)=>{
    const tasks = await list.findAll({
        where:{
            user:req.user.username
        }
    })
    var listOfTasks = []
    tasks.forEach((task)=>{
        listOfTasks.push({
            id:task.id,
            task:task.task
        })
    })
    res.json({  
        'status':true,
        user:req.user,
        tasks:listOfTasks
    })
})

router.post('/todolist/add',verifyToken,async(req,res)=>{
    const {task} = req.body
    try{
        const newList = await list.create({task:task,user:req.user.username})
        res.json({
            status:true
        })
    }
    catch(err){
        res.json({
            status:false,
            error:err
        })
    }
})

router.post('/todolist/delete',verifyToken,async(req,res)=>{
    const {id} = req.body;
    try {
        await list.destroy({
            where:{
                id:id
            }
        });
        res.json({'status':true})           
    } catch (error) {
        res.json({
            'status':false,
            'err':error
        })
        console.log(error)
    }

})


module.exports = router