var express = require('express');
var router = express.Router();

// 引入自定义的controller
const AdminController = require('../controllers/admin')


// 管理员管理模块路由
router.get('/',AdminController.list)        //管理员列表路由
router.post('/',AdminController.add)        //添加管理员路由
router.put('/',AdminController.update)      //修改管理员路由
router.delete('/',AdminController.remove)   //删除管理员路由
router.get('/:id',AdminController.info)     //单条管理员路由
module.exports = router;