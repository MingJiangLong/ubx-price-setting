import { AxiosRequestConfig } from 'axios'
import { get as g } from '../http'
import { post as p } from '../http'
import { BranchTree } from '../modules'

function get<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
  return g<R>('ACL', url, params, config)
}

function post<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
  return p<R>('ACL', url, data, config)
}
export default {
  /**
   * 获取友智慧账号下分公司权限
   * @description BE 陆学嘉
   * @param userName 用户名
   * @deprecated
   */
  fetchAccountAccess(userName: string) {
    return get<BranchTree>('/api/userOrgsBySysAndEmpOrCommen.json', {
      username: userName,
      system: 3
    })
  }
}
