const Sequelize = require('sequelize')
const db = require('../db')
module.exports = db.define('Admin',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(36),
        allowNull:false
    },
    name:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
    lastLoginAt:{
        type:Sequelize.DATE
    },
    createdAt:{
        type:Sequelize.DATE
    }
},{
    underscored:true,
    tableName:'admin'
})