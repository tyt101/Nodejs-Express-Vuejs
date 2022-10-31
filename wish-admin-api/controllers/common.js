const async = require('async')
const Constant = require('../constant/constant')

const exportObj = {
    clone,
    checkParams,
    autoFn
}

module.exports = exportObj


// 深拷贝
function clone(obj){
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 
 * @param {*} params 请求的参数
 * @param {*} checkArr 要检验的参数数组
 * @param {*} cb 回调函数
 */
function checkParams(params,checkArr,cb){
    let flag = true
    checkArr.forEach(v => {
        if(!params[v]){
            flag = false
        }
    })
    if(!flag){
        cb(Constant.LACK)
    }else{
        cb(null)
    }
}

/**
 * 
 * @param {*} tasks 要执行的任务
 * @param {*} res 响应
 * @param {*} resObj 数据实体
 */
function autoFn(tasks,res,resObj){
    async.auto(tasks,function(err){
        if(!!err){
            res.json({
                code:err.code || Constant.DEFAULT_ERROR.code,
                msg:err.msg || JSON.stringify(err)
            })
        }else{
            res.json(resObj)
        }
    })
}