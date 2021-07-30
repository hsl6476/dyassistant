import axios from 'axios'
import qs from 'querystring'

const errorHandle = (status, other) => {
    switch (status) {
        case 400:
            console.log("请求失败, 服务器请求限制")
            break
        case 401:
            console.log("请求失败, 用户信息验证失败")
            break
        case 403:
            console.log("请求失败, 请求被限制")
            break
        case 404:
            console.log("请求失败, 网络请求不存在")
            break
        default:
            console.log("请求失败, " + other)
    }
}

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15 * 1000,
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(config => {
    if (config.method === "post") {
        config.data = qs.stringify(config.data)
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error
        if (response) {
            errorHandle(response.status, response.data)
            return Promise.reject(response)
        } else {
            console.log("请求失败")
        }
    }
)

export default instance