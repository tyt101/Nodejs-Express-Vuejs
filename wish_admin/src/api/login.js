import createRequest from '../utils/request/index' 

// createRequest传入一个opt配置
// axios({
//     method: obj.method,
//     url: obj.url,
//     data: obj.data,
//     params: obj.params,
//     headers: {
//       token: localStorage.getItem('token')
//     }
//   })



// createRequest中headers已经被统一封装了
// createRequest({
//     method:'post',
    
// })


export function login(data){
    console.log(data)
    return createRequest({
        method:'post',
        url:'/api/login',
        data,
    })
}