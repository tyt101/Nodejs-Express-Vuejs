const jwt = require('jsonwebtoken')
const tokenKey = 'TYT_ADMIN_GOOD'

// token密钥
const Token = {
    /**
     * 
     * @param {*} data 加密的数据
     * @param {*} time 过期时间
     */
    encrypt:function(data,time){
        // jwt.sign传入加密的数据，tokenKey，到期时间
        return jwt.sign(data,tokenKey,{expiresIn:time})
    },
    decrypt:function(token){
        try{
            let data = jwt.verify(token,tokenKey)
            return {
                token:true,
                data:data
            }
        }catch(e){
            return {
                token:false,
                data:e
            }
        }
    }
}
module.exports = Token