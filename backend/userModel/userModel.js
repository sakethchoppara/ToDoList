const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/db')

const user = sequelize.define('user',{
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    }
});


user.sync()

module.exports = user