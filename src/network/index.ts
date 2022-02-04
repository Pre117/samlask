import axios from 'axios'

/**
 * 普通封装请求，不需要携带token也能访问的请求
 */
export const nAxios = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 2000,
    timeoutErrorMessage: "连接不上服务器"
})

// 特殊封装请求，使用该API需要有token
export const sAxios = axios.create({})