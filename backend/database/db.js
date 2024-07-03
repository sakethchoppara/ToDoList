const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todolist','admin','admin',{
    host:'localhost',
    dialect:'postgres',
})



const testConnection = async()=>{
    try{
        await sequelize.authenticate();
        console.log('connection established')
    }
    catch(error){
        console.log("error at connection ",error)
    }
}



module.exports = {
    sequelize,
    testConnection
}