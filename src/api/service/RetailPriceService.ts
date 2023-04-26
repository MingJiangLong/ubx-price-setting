import { AxiosRequestConfig } from 'axios'
import { get as g } from '../http'
import { post as p } from '../http'

function get<R = any, P = any>(url: string, params?: P, config?: AxiosRequestConfig) {
  return g<R>('RETAIL_PRICE', url, params)
}

function post<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
  return p<R>("RETAIL_PRICE", url, data, config)
}
export default {

  /**
   * 商品建议零售价OA请求
   * 申请建议零售价和OA审批合并\n
   * @description BE 陆学嘉
   */
  submitAdviceRetailPriceConfig(options: Partial<PriceConfigParam>) {
    return post('/srp/addProductSrp', options)
  },

  /**
   * 获取建议(sap零售价|合约价)
   * @param options 
   * @description BE 陆学嘉
   */
  fetchAdviceRetailPrice(id: any, org4Id: string | number) {
    return post("/srp/getProductSrp", { productIds: [id], org4Id })
  },
  /**
   * 获取友智慧账号下分公司权限
   * @description BE 陆学嘉
   * @param userName 用户名
   */
  fetchAccountAccess(userName: string) {
    return get<any>('/api/userOrgsBySysAndEmpOrCommen', {
      username: userName,
      system: 3
    })
  }
}

type PriceConfigParam = {

  /**
   * 生效月份
   */
  effectiveMonth: string

  /**
   * 分公司ID集合
   */
  org4Ids: string[]

  /**
   * 商品信息列表
   */
  productInfoList: {
    /**
     * 成本价
     */
    costPrice: number
    /**
     * 商品ID
     */
    productId: number

    /**
     * 商品名称
     */
    productName: string

    /**
     * 建议零售价
     */
    retailPrice: string
  }[],
  /**
   * 备注
   */
  remark: string

  /**
   * 操作人名字
   */
  submitter: string

  /**
   * 操作人统一账号
   */
  uin: string
}