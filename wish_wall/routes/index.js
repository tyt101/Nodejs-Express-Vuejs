var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index',{
//     list:['1','3']
//   });
// });

// 引入自定义的controller
const IndexController = require('../controllers/index')
// 定义首页路由
router.get('/', IndexController.getList)
// 提交表单路由
router.post('/add', IndexController.add) 
module.exports = router;

