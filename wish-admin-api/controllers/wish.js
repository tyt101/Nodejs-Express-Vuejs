const Common = require('./common')
const WishModel = require('../models/wish')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')

function list(req,res){}
function add(req,res){}
function update(req,res){}
function remove(req,res){}
function info(req,res){}

exportObj = {
    list,
    add,
    update,
    remove,
    info
}
module.exports = exportObj