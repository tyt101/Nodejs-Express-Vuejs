const Common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require ('dateformat');
const Token = require('./token')
const TOKEN_EXPIRE_SECOND = 60*60



function login(req,res){
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams : cb => {
            Common.checkParams(req.body,['username','password'],cb)
        },
        query:['checkParams', (results,cb) => {
            AdminModel.findOne({
                where:{
                    username:req.body.username,
                    password:req.body.password
                }
            }).then(function(result){
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
            console.log("writeLastLoginAt__adminId",adminId)
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
function register(req,res){
    // console.log(req)
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
    let tasks = {
        checkParams: cb => {
            console.log("checkParams",req.body.username,req.body.password)
            Common.checkParams(req.body,['username','password','password2'],cb)
        },
        query:['checkParams', (results,cb) => {
            AdminModel.findOne({
                where:{
                    username:req.body.username
                }
            }).then(function(result){
                // 该用户已经存在
                if(result){
                    resObj.data = {
                        name:result.name
                    }
                    cb(Constant.ADMIN_EXIST)
                }else{
                    cb(null,Constant.DEFAULT_SUCCESS)
                }
            }).catch(function(err){
                console.log('err',err)
                cb(Constant.DEFAULT_ERROR)
            })
        }],
        createAdmin: ['query',(results,cb) => {
            console.log("createAdmin",results)
            if(results['query'] === Constant.ADMIN_EXIST){
                cb(Constant.ADMIN_EXIST)
            }else{
                AdminModel.create({
                    username:req.body.username,
                    password:req.body.password,
                    name:'新朋友',
                    role:2,
                    lastLoginAt:null,
                    createdAt:new Date()
                }).then(result => {
                    if(result){
                        cb()
                    }else{
                        cb(Constant.DEFAULT_ERROR)
                    }
                }).catch(err => {
                    cb(Constant.DEFAULT_ERROR)
                })
            }
        }]
    }
    Common.autoFn(tasks,res,resObj)
}
// 暂时有点问题。再看一下Sequelize文档
function update(req,res) {
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS)
    let tasks = {
        checkParams : cb => {
            Common.checkParams(req.body,['name','username','password'],cb)
        },
        query: ['checkParams', (results, cb) => {
            // let {username} = JSON.parse(localStorage.getItem('loginStatus'))
            AdminModel.findOne({
                where : {
                    username:req.body.username,
                }
            }).then(function(result){                
                if(result){
                    resObj.data = {
                        id:result.id,
                        username:result.username,
                        name:result.name,
                        role:result.role,
                        lastLoginAt:dateFormat(result.lastLoginAt,'yyyy-mm-dd HH:MM:ss'),
                        createdAt:dateFormat(result.createdAt,'yyyy-mm-dd HH:MM:ss')
                    };
                    cb(null,result.id)
                }else{
                    cb(Constant.ADMIN_NOT_EXSIT)
                }
            }).catch(function(err){
                cb(Constant.DEFAULT_ERROR)
            })
        }],
        updateInfo : ['query', (results, cb) => {
            let adminId = results['query']
            console.log("adminId",adminId)
            AdminModel.update({
                name:req.body.name,
                password:req.body.password
            },{
                where: {
                    id:adminId
                }
            }).then(function(result){
                console.log("result",result)
                if(result){
                    resObj.data.name = req.body.name
                    cb(null,Constant.DEFAULT_SUCCESS)
                }else{
                    cb(Constant.DEFAULT_ERROR)
                }
            }).catch(err => {
                cb(Constant.DEFAULT_ERROR)
            })
        }]
    }
    Common.autoFn(tasks,res,resObj)
}
let exportObj = {
    login,
    register,
    update
}
module.exports = exportObj