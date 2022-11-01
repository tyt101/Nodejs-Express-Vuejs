var express = require('express');
var router = express.Router();

// 引入自定义的controller
const IndexController = require('../controllers/index')

// 登录模块路由
router.post('/login',IndexController.login)

module.exports = router;