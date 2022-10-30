// 数据库映射
const Sequelize = require('sequelize')
const db = require('../../db')

const Wish = db.define('Wish', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,        //主键
        allowNull:false,
        autoIncrement:true      //自动+1
    },
    name:{
        type:Sequelize.STRING(20),
        allowNull:false,
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    underscored:true,   //是否支持驼峰
    tableName:'wish'    //数据库表名
})

module.exports = Wish