import RetailPriceService from '@/api/service/RetailPriceService'
import { defineStore } from 'pinia'
import useCommonData from './useCommonData'

const data = {
  state() {
    return {
      effectiveMonth: [],
      org4Ids: '',
      productInfoList: [],
      remark: '',
      // submitter: '',
      // uin: ''
    }
  },
  getters: {
    effectiveMonthStr() {
      return this.effectiveMonth.join('.')
    },
    orgId() {
      if (!this.org4Ids.length) return ''
      return this.org4Ids.split(';')[0]
    },
    orgIdName() {
      if (!this.org4Ids.length) return ''
      return this.org4Ids.split(';')[1]
    },
    FEeffectiveMonthStr() {
      return this.effectiveMonth.join('.')
    },
    BEeffectiveMonthStr() {
      return this.effectiveMonth.join('-')
    },
  },
  actions: {
    addGoods(item) {
      this.productInfoList.push(item)
    },
    updateEffectiveMonth(value) {
      this.effectiveMonth = value
    },
    updateOrg4Ids(value) {
      this.org4Ids = value
    },

    /**
     * 提交表单
     * 用户信息从参数传来
     * @param options 
     */
    async submitForm(options: {
      submitter: string
      uin: string
    }) {
      const result = await RetailPriceService.submitAdviceRetailPriceConfig({
        effectiveMonth: this.BEeffectiveMonthStr,
        org4Ids: [this.orgId],
        productInfoList: this.productInfoList.map(item => ({
          costPrice: item.costPrice,
          productId: item.id,
          productName: item.full_name,
          retailPrice: item.retailPrice
        })),
        remark: this.remark,
        submitter: "",
        uin: "",
        ...options
      })
      if (result.code != 1) throw new Error(result?.msg)
    },
    removeGoods(id) {
      const index = this.productInfoList.findIndex(item => item.id == id)

      if (index == -1) return;
      this.productInfoList.splice(index, 1)
    },
  }
}
export default defineStore("useAdviceRetailPrice", data)


type I_State = {

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