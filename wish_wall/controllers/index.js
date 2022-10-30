// const Common = require('./common')

const async = require('async')
const WishModel = require('../model/models/wish')
const Constant = require('../constant/constant')

let exportObj = {
    getList,
    // add
}
module.exports = exportObj


function getList(req,res) {
    let tasks = {
        query: cb => {
            WishModel.findAll({
                limit:10,
                order:[['created_at','DESC']]
            }).then(function(result){
                let list = [];
                result.forEach((v,i) => {
                    let obj = {
                        id:v.id,
                        name:v.name,
                        content:v.content
                    };
                    list.push(obj)
                });
                cb(null,list)
            }).catch(function(err){
                console.log(err)
                cb(Constant.DEFAULT_ERROR)
            })
        }
    };
    async.auto(tasks, function(err,result){
        console.log(tasks)
        if(err){
            console.log(err)
        }else{
            res.render('index',{
                list:result['query']
            })
        }
    })
}