var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var IndexRouter = require('./routes/index');
var WishRouter = require('./routes/wish');
var AdminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
const verifyMiddleware = require('./routes/middleware/verify')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//用art-template引擎替换默认的jade引擎
//app.set(‘view engine’, ‘jade’);
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRouter);
app.use('/wish',verifyMiddleware.verifyToken ,WishRouter);
app.use('/admin',verifyMiddleware.verifyToken , AdminRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
