module.exports = config = {
    DEBUG:true,
    MYSQL:{
        host:'localhost',
        database:'wish',
        username:'root',
        password:'TYT3663172a'
    }
}

if(process.env.NODE_ENV === 'production'){
    config.MYSQL = {
        host:'aaa.mysql.rgs.aliyuncs.com',
        database:'aaa',
        username:'aaa',
        password:'TYT3663172a'
    }
}