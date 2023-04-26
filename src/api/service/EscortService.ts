import { buildForm, sha1Sign } from '@/util'
import { AxiosRequestConfig } from 'axios'
import { get as g } from '../http'
import { post as p } from '../http'
import { BEResponse } from '../modules'

function get<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
  return g<R>("ESCORT", url, params, config)
}

function post<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
  const form = buildForm({
    ...data,
    ...sha1Sign()
  })
  return p<R>("ESCORT", url, form, config)
}


export default {
  /**
   * 获取线路列表
   * @param loginName 
   * @description BE 曾宪东
   */
  fetchLineList(loginName: string) {
    return post('simple/get_tile_lines', { loginName })
  },

  /**
   * 根据线路获取机器列表
   * @description BE 曾宪东
   */
  fetchMachineListByLine(options: {
    eid: string
    orgIds: string
  }) {
    return post("/simple/get_vm_list", options)
  },

  /**
   * 搜索可在机器中配置的商品
   * @description BE 曾宪东
   */
  searchConfigurableGoodsInMachine(options: {
    vmCode: string
    q: string
    limit: number
  }) {
    return post("/simple/vm_search_product", options)
  }
}