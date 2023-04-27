import a, { AxiosRequestConfig } from 'axios';
import hostConfig from './hostConfig';
const axios = a.create({ timeout: 6000 })
axios.defaults.baseURL = '/'
axios.interceptors.request.use(config => {
  // 生产环境
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(resp => {

  // 不同系統返回差别太大不适合统一封装
  // let result = {
  //   code: 200,
  //   data: null,
  //   msg: ''
  // }
  // // 对返回做通用处理
  // let data = resp.data || {};

  // result.code = data.code === undefined ? 200 : data.code

  // result.msg = data.msg === undefined ? '' : data.msg

  // result.data = data.data === undefined ? data : data.data

  // return Promise.resolve({
  //   ...resp,
  //   data: result
  // });
  return Promise.resolve(resp)
}, error => {
  return Promise.resolve({
    data: {
      code: error?.code ?? 500,
      msg: error?.msg ?? error.message,
      data: null
    }
  })
})

/**
 * 获取不通环境host地址
 * @param sys 
 */
function getUrl(sys: System) {
  const env = import.meta.env.MODE
  return hostConfig[env][sys]
}
/**
 * Get请求
 * @param url 请求路由
 * @param params 路径query
 * @param config 配置
 */
export async function get<R = any, P = any>(sys: System, url: string, params?: { [k: string]: P }, config?: AxiosRequestConfig) {
  const result = await axios.get<any>(url, {
    params,
    ...config,
    method: 'GET',
    baseURL: getUrl(sys)
  })
  return result.data
}

/**
 * Post请求
 * @param url 请求路径 
 * @param data 请求参数
 * @param config 配置
 */
export async function post<R = any, D = any>(sys: System, url: string, data?: D, config?: AxiosRequestConfig) {
  const result = await axios.post<any>(url, data, {
    ...config,
    method: 'POST',
    baseURL: getUrl(sys)
  })
  return result.data
}

export type System = 'ACL' | 'RETAIL_PRICE' | 'IVM' | 'ESCORT'
export default {
  post,
  get
}