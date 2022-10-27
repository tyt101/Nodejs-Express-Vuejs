var createError = require('http-errors');     //http错误处理模块
var express = require('express');             //引入Express
var path = require('path');                   //引入path
var cookieParser = require('cookie-parser');  //引入cookie处理对象
var logger = require('morgan');               //引入日志模块

var indexRouter = require('./routes/index');  
var usersRouter = require('./routes/users');

var app = express();                          //创建express应用

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //定义页面目录
// app.set('view engine', 'jade');                   //定义页面模版引擎
app.engine('.html',require('express-art-template'))
app.set('view engine', 'html');                   //更换页面模版引擎为html

app.use(logger('dev'));                           //定义日志打印级别
app.use(express.json());                          //定义JSON格式处理数据
app.use(express.urlencoded({ extended: false })); //定义使用urlencode处理数据及querystring模块解析数据
app.use(cookieParser());                          //定义使用cookie处理对象
app.use(express.static(path.join(__dirname, 'public')));  //定义静态资源目录public

app.use('/', indexRouter);                        //定义指向index的路由
app.use('/users', usersRouter);                   //定义指向users.js的路由

// 定义404错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 定义其他错误处理
app.use(function(err, req, res, next) {
  // 设置locals，只在开发环境生效
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);  //返回错误http状态码
  res.render('error');            //渲染错误页面
});

module.exports = app;
