
// 新增的配置文件
const config = {
    DEBUG: true,
    //MySQL数据库连接配置
    MYSQL: {
        host: 'localhost',
        database: 'wish',
        username: 'root',
        password: 'TYT3663172a'
    }
}
if(process.env.NODE_ENV === 'production') {
    config.MYSQL = {
        host : 'aaa.mysql.rds.aliyuncs.com',
        database: 'aaa',
        username: 'aaa',
        password: 'TYT3663172a'
    }
}
module.exports = config