const { DataTypes } = require('sequelize')
const {sequelize} = require('../database/db')

const list = sequelize.define('list',{
    task:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

list.sync()


module.exports = list