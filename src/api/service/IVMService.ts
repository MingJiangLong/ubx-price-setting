import { AxiosRequestConfig } from 'axios'
import { get as g } from '../http'
import { post as p } from '../http'
import { BEResponse } from '../modules'
import useRetailPriceForm from '@/store/modules/useRetailPriceForm'
import { AESSign } from '@/util'
// const useRea
function get<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
  return g<R>('IVM', url, params, config)
}

function post<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
  return p<R>('IVM', url, data, config)
}
export default {

  /**
   * 是否支持纸硬币
   * @param machineCodes 机器编号
   * @description BE 黄建任 
   */
  isSupportPaperCoin(machineCodes: string[]) {
    return post<{ is_support: boolean }, any>("/api/vm/readyMoneySupport", {
      inner_codes: machineCodes
    },{
      headers: {
        "x-requested-with": "XMLHttpRequest"
      }
    })
  },

  /**
   * 零售价新增调价单
   * @param options 
   * @description BE 徐基豪
   */
  addAdjustConfig(options: any) {
    return post('api/priceApplication/add', options, {
      headers: {
        "x-requested-with": "XMLHttpRequest"
      }
    })
  },

  /**
   * 商品模糊查询
   * @param IDOrName 
   * @returns 
   * @description BE 黄建任
   */
  searchGoodsByIDOrName(IDOrName: string) {
    return post('/api/products/fuzzySearch', { search: IDOrName }, {
      headers: {
        "x-requested-with": "XMLHttpRequest"
      }
    })
  },

  /**
   * 机器数量是否大于200
   * @param ids 
   * @returns 
   * @description BE 徐基豪
   */
  async isMachinesNotGreaterThan200(ids: string[]) {
    return await post('api/priceApplication/checkMtvmNum', {
      machine_range: 1,
      org_id: ids,
      inner_code: []// 选择的机器
    }, {
      headers: {
        "x-requested-with": "XMLHttpRequest"
      }
    })
  }
}