/**
 * 建议零售价请求参数
 */
export type GoodHaveAdvicePriceRequestParams = Partial<
  {
    /**
     * 月份,不传默认为当月,格式:2022-07
     */
    month: string

    /**
     * 点位ID
     */
    nodeId: string

    /**
     * 分公司ID
     */
    org4Id?: number

    /**
     * 分公司ID集合
     */
    org4Ids: number[]

    /**
     * 分公司名字
     */
    org4Name?: string

    /**
     * 商品ID
     */
    productIds: number[]

    /**
     * 承租方ID
     */
    providerId: number

    /**
     * 机器号
     */
    vmCode: string
  }>

/**
 * 根据分公司和商品查询建议零售价后端返回
 */
export type GoodHaveAdvicePriceResponse = BEResponse<{
  list: {
    /**
     * 生效月份
     */
    effectiveMonth?: string

    /**
     * 分公司ID
     */
    org4Id?: number
    /**
     * 分公司名
     */
    org4Name?: string

    /**
     * 商品ID
     */
    productId?: number

    /**
     * 商品名称
     */
    productName?: string

    /**
     * 建议零售价
     */
    retailPrice?: number

    /**
     * 类型,1:运管录入、2:SAP
     */
    type?: 1 | 2

  }[]

  /**
   * 存在建议零售价的商品列表大小
   */
  size: number
}>

/**
 * 建议零售价提交请求参数
 */
export type AdviceRetailPriceRequestParams = Partial<
  {
    /**
     * 生效月份
     */
    effectiveMonth: string
    /**
     * 分公司ID集合
     */
    org4Ids: number[]

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
      retailPrice: number
    }[]

    /**
     * 备注
     */
    remark: string,
    /**
     * 操作人名字
     */
    submitter: string

    /**
     * 操作人统一账号
     */
    uin: string
  }
>
export type BEResponse<T> = {
  code: number
  data: T
  msg: string
}

/**
 * 分公司权限？？
 */
export type BranchTree = {
  level: number
  orgId: number
  orgName: string
  sub: BranchTree[]
}