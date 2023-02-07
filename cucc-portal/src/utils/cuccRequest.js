import axios from 'axios'
export const cuccRequest = axios.create({
    // API 请求的默认前缀
    baseURL: 'redis',
    timeout: 500000 // 请求超时时间
})
export const cucc1Request = axios.create({
    // API 请求的默认前缀
    baseURL: 'redis',
    timeout: 500000 // 请求超时时间
})
export const localCuccRequest = axios.create({
    // API 请求的默认前缀
    baseURL: 'redis',
    timeout: 500000 // 请求超时时间
})

export const testCuccRequest = axios.create({
    // API 请求的默认前缀
    baseURL: 'slCucc',
    timeout: 500000 // 请求超时时间
})

// export default { cuccRequest,localCuccRequest}
