import createRequest from '../utils/request/index' 
/**
 * 
 * @param {*} data 登陆信息{username:'',password:''}
 * @returns promise
 */
export function login(data){
    return createRequest({
        method:'post',
        url:'/api/login',
        data,
    })
}
/**
 * 
 * @param {*} data 注册信息{username:'',password:''}
 * @returns promise
 */
export function register(data){
    return createRequest({
        method:'post',
        url:'/api/register',
        data,
    })
}


export function update(data) {
    return createRequest({
        method:'put',
        url:'/api/update',
        data
    })
}