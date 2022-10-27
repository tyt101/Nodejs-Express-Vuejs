var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('wish',{
    name:'tyt',
    wishes:'我要月薪18k'
  });
});

module.exports = router;
