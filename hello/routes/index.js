var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' ,age:38});
});

/* GET error world page (error.jade)*/
router.get('/world',function(req,res,next){
  
  res.render('error',{
    message:"error world",
    error:{
      status:"500",
      stack:"stack outTime"
    }
  })
})
// 路由模糊匹配  /west   /wet         url

router.get('/wes?t',function(req,res,next){
  console.log("url",req.url)
  console.log("query",req.query)
  res.render("index",{title:"模糊匹配?"})
})
// 路由模糊匹配  /west   /wesst /wessssst       :id
router.get('/wes+t/:id',function(req,res,next){
  console.log("url",req.url)
  res.render("index",{title:"模糊匹配+"})
})
// 路由模糊匹配  /wes123t   /wesst /wesskidet   query(只有get方式可以获取query参数，因为post参数在请求体中，不在url中)
router.get('/wes*t',function(req,res,next){
  console.log("query",req.query)
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

// post路由
router.post('/abc',function(req,res,next){
  console.log("body",req.body)
  res.send(req.cookies)
  res.render('index',{title:'Express'})
})


// params
router.get("/book/params/:id/:userId",function(req,res,next){
  res.send(req.params)
})


// render
router.get("/book/params/:id",function(req,res,next){
  // res.send(req.params)
  res.render('index',{ title: 'Hello' ,age:38},function(err,html){
    // next(err)
    console.log("==========")
    console.log(err)
  })
})

// res.json
router.get("/book/json",function (req,res,next) {
  res.json({
    name:'json',
    age:21,
    hobby:['wa','da','i[']
  })
})

// res.status
router.get('/book/status',function(req,res,next){
  res.status(304).end()
})


// res.redirect

router.get('/book/book1',function(req,res,next){
  console.log("book1")
  res.redirect(302,'/book/book2')
})
router.get('/book/book2',function(req,res,next){
  console.log("book2")
  res.end()
})