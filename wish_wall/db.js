// 数据库配置文件
// 存放Sequelize的实例化对象
var Sequelize = require('sequelize')
var CONFIG = require('./config')

// 实例化数据库对象
var sequelize = new Sequelize(CONFIG.MYSQL.database,CONFIG.MYSQL.username,CONFIG.MYSQL.password,{
    host:CONFIG.MYSQL.host,
    dialect:'mysql',
    logging:CONFIG.DEBUG ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone:'+08:00'
})
// 验证数据库是否连接成功
sequelize.authenticate().then(() => {console.log("数据库连接成功")}).catch(() => {console.log("数据库连接失败")})
module.exports = sequelize
