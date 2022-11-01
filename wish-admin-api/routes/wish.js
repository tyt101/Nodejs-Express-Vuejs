var express = require('express');
var router = express.Router();

// 引入自定义的controller
// const WishController = require('../controllers/wish')


// // 许愿管理模块路由
// router.get('/',WishController.list)        //许愿列表路由
// router.post('/',WishController.add)        //添加许愿路由
// router.put('/',WishController.update)      //修改许愿路由
// router.delete('/',WishController.remove)   //删除许愿路由
// router.get('/:id',WishController.info)     //单条许愿路由
module.exports = router;