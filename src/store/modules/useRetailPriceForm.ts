
import IVMService from "@/api/service/IVMService";
import { AESSign } from "@/util";
import { defineStore } from "pinia";
import useCommonData from "./useCommonData";
const data = {
  // namespaced: true,
  state() {
    return {

      /**
       * 调价单名称
       */
      name: '',

      /**
       * 生效方式
       * 1定时生效，2立即生效，3下次补货后生效
       */
      workType: "3" as "1" | "2" | "3",
      invalidType: "1",

      isMachineOrLineDisplay: "1" as "1" | "3",
      linesChecked: [],
      machineChecked: [],
      goods: [],
      isPaperCoinAble: false// 是否能够使用纸硬币
    } as IState
  },
  getters: {

    /**
     * 选中线路名字数组
     * @returns 
     */
    linesCheckedName() {
      return this.linesChecked.map(item => item.split(';')[1])
    },

    /**
     * 选中线路id-6数组
     * @returns 
     */
    linesCheckedId() {
      return this.linesChecked.map(item => item.split(';')[0]).map(item => `${item}-6`)
    },

    /**
     * 选中线路id-6数组
     * @returns 
     */
    linesCheckedIdWithout6() {
      return this.linesChecked.map(item => item.split(';')[0])
    },

    /**
     * 选中的机器对应点位编号 nodId
     * @returns 
     */
    nodeCheckedId() {
      return this.machineChecked.map(item => item.split(';')[0])
    },

    /**
     * 选中的机器编号 vmCode
     * @returns 
     */
    machineCheckedId() {
      return this.machineChecked.map(item => item.split(';')[1])
    },

    /**
     * 选中的机器编号字符串
     */
    machineCheckedIdsStr() {
      return this.machineChecked.map(item => item.split(';')[1]).join('、')
    },
  },
  actions: {
    updateName(name) {
      this.name = name
    },
    updateWorkType(type) {
      this.workType = type
    },
    addGoods(item) {
      this.goods.push(item)
    },
    removeGoods(id) {
      const index = this.goods.findIndex(item => item.id == id)

      if (index == -1) return;
      this.goods.splice(index, 1)
    },
    async submitForm() {
      const result = await IVMService.addAdjustConfig({
        encrypt: AESSign({
          type: 40,
          name: this.name,
          machine_range: this.isMachineOrLineDisplay,
          org_id: this.linesCheckedId,
          merchandise_type: 2,
          tags: [],
          node_ids: this.nodeCheckedId,// 选择的机器，校验后的点位id
          merchandise: this.goods.map(item => ({ mdse_id: item.id, set_price: item.price })),
          effective_type: this.workType,
          invalid_type: 1,
          created_name: useCommonData().account
        })
      })

      if (result?.code != 200) throw new Error(result?.msg)
    },
    updateIsPaperCoin(value) {
      this.isPaperCoinAble = value
    }
  }

}
export default defineStore("useRetailForm", data)

type IState = {
  /**
   * 调价单名称
   */
  name: string

  /**
   * 生效方式
   * 1定时生效，2立即生效，3下次补货后生效
   */
  workType: "1" | "2" | "3"

  /**
   * 失效方式
   */
  invalidType: "1"

  /**
   * 机器范围
   * 1选择(组织/线路) 2选择标签 3选择机器范围
   */
  isMachineOrLineDisplay: "1" | "3"

  /**
   * 选中的线路
   */
  linesChecked: string[],

  /**用来优化寻找名字 不然O(n^2) */
  // linesCheckedName: string[]

  /**
   * 选中的机器
   */
  machineChecked: string[],
  /**用来优化寻找名字 不然O(n^2) */
  // machineCheckedName: string[],

  /**
   * 添加的商品
   */
  goods: { price: string, product_img: string, full_name: string, id: number }[]
  isPaperCoinAble: boolean
}