const Token = require('../../controllers/token')
const Constant = require('../../constant/constant')
const exportObj = {
    verifyToken
}
module.exports = exportObj
// 中间件 验证token
// token是由用户登录，服务器端返回的
function verifyToken(req,res,next){
    if(req.path === '/login') return next()
    let token = req.headers.token
    const tokenVerifyObj = Token.decrypt(token)
    if(tokenVerifyObj.token) return next()
    else res.json(Constant.TOKEN_ERROR)
}
