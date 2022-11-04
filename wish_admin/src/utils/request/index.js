import axios from 'axios'
import instanceDefaultConfig from './instanceDefaultConfig'

export default function createRequest(opt){
    const instance = axios.create(instanceDefaultConfig)
    // 暂时不对响应拦截器和请求拦截器做什么处理   TODO：之后需要处理再进行处理
    instance.interceptors.request.use(
        (config) => {
        return config 
        },
        (err) => err
    )
    instance.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          return error
        }
    )

    return instance.request(opt)
}