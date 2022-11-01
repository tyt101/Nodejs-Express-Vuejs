const Common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require ('dateformat');
const Token = require('./token')
const TOKEN_EXPIRE_SECOND = 60*60



function login(req,res){
    console.log("进去了login")
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams : cb => {
            Common.checkParams(req.body,['username','password'],cb)
        },
        query:['checkParams', (results,cb) => {
            console.log('req.body.username',req.body.username)
            console.log('req.body.password',req.body.password)
            AdminModel.findOne({
                where:{
                    username:req.body.username,
                    password:req.body.password
                }
            }).then(function(result){
                console.log("result",result)
                if(result){
                    resObj.data = {
                        id:result.id,
                        username:result.username,
                        name:result.name,
                        role:result.role,
                        lastLoginAt:dateFormat(result.lastLoginAt,'yyyy-mm-dd HH:MM:ss'),
                        createdAt:dateFormat(result.createdAt,'yyyy-mm-dd HH:MM:ss')
                    };
                    const adminInfo = {
                        id:result.id
                    }
                    console.log('adminInfo',adminInfo)
                    let token = Token.encrypt(adminInfo,TOKEN_EXPIRE_SECOND)
                    console.log('token',token)
                    resObj.data.token = token
                    cb(null,result.id)
                }else{
                    cb(null,Constant.LOGIN_ERROR)
                }
            }).catch(function(err){
                console.log('err',err)
                cb(Constant.DEFAULT_ERROR)
            })
        }],
        writeLastLoginAt: ['query',function(results,cb){
            let adminId = results['query']
            AdminModel.update({
                lastLoginAt:new Date()
            },{
                where:{
                    id:adminId
                }
            }).then(function(result){
                if(result){
                    cb(null)
                }else{
                    cb(Constant.DEFAULT_ERROR)
                }
            }).catch(function(err){
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    }
    Common.autoFn(tasks,res,resObj)
}


let exportObj = {
    login
}
module.exports = exportObj