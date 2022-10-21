var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' ,age:38});
});

/* GET error world page */
router.get('/world',function(req,res,next){
  res.render('error',{
    message:"error world",
    error:{
      status:"500",
      stack:"stack outTime"
    }
  })
})
// 路由模糊匹配  /west   /wet
router.get('/wes?t',function(req,res,next){
  res.render("index",{title:"模糊匹配?"})
})
// 路由模糊匹配  /west   /wesst /wessssst
router.get('/wes+t',function(req,res,next){
  res.render("index",{title:"模糊匹配+"})
})
// 路由模糊匹配  /wes123t   /wesst /wesskidet
router.get('/wes*t',function(req,res,next){
  res.render("index",{title:"模糊匹配*"})
})
// 路由模糊匹配  根据正则匹配   /west    /westdjisi  /djiwestdisf
router.get(/west/,function(req,res,next){
  res.render("index",{title:"模糊匹配--正则"})
})
// 中间件
router.get('/car',function(req,res,next){
  console.log("这里是中间件")
  next();
},function(req,res,next){
  res.send("这里是返回")
})
// 循环渲染
router.get('/loop',function(req,res,next) {
  res.render('index',{myList:[
    {id:1,name:'tyt',age:21},
    {id:2,name:'tyl',age:24},
    {id:3,name:'gjf',age:47}
  ]})
})
module.exports = router;
