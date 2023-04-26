import ACLService from '@/api/service/ACLService';
import EscortService from '@/api/service/EscortService';
import { showToast } from 'vant';
import { defineStore } from 'pinia'
import useRetailPriceForm from './useRetailPriceForm';
import IVMService from '@/api/service/IVMService';
import { getEid, getLoginName } from '@/util';
import RetailPriceService from '@/api/service/RetailPriceService';
import useAdviceRetailPriceForm from './useAdviceRetailPriceForm';
const data = {
  state: () => {
    return {
      title: "测试",
      // account: 'qingshiming',
      searchValueOfLine: "",
      searchValueOfMachine: "",
      searchValueOfGoods: "",
      goods: [],
      lines: [],
      // eid: '5252',
      machines: [],
      access: {},
      companyTree: [],
      submitter: "qingshimign"
    }
  },
  getters: {
    account() {
      return getLoginName()
    },
    eid() {
      return getEid()
    },
    filteredLines() {
      return this.lines.filter(item => `${item.lineName ?? ''}`.indexOf(this.searchValueOfLine) != -1)
    },
    filteredMachines() {
      return this.machines.filter(item => `${item.vmCode ?? ''}`.indexOf(this.searchValueOfMachine) != -1)
    }
  },
  actions: {
    updateSearchValueOfGoods(value) {
    },
    /**
     * 查询账号权限
     * @returns 
     */
    async fetchCompanyTree() {
      if (this.companyTree.length) return;
      try {
        if (!!!this.account) return console.log("获取统一登录账号失败");
        let result = await RetailPriceService.fetchAccountAccess(this.account);
        if (result?.code != 1) throw new Error(result?.msg);
        if (!result.data) throw new Error("组织信息为空");
        let list = [];
        function format(params: Tree) {
          if (!params) return;
          if (params.level == 3 && params.orgName) {
            list.push({
              text: params.orgName,
              value: `${params.orgId};${params.orgName}`
            })
          }
          if (Array.isArray(params?.sub)) {
            params.sub.forEach(item => {
              format(item)
            })
          }
        }

        format(result.data);
        if (list.length == 1) {
          useAdviceRetailPriceForm().updateOrg4Ids(list[0].value)
        }
        this.companyTree = list;
      } catch (error) {
        showToast(error.message)
      }
    },

    /**
     * 查询线路或者机器
     * 数据不经常变化所以做了缓存
     * @returns 
     */
    async fetchMachineOrLines() {
      try {
        const isMachineOrLineDisplay = useRetailPriceForm().isMachineOrLineDisplay;
        if (isMachineOrLineDisplay == '1') {
          if (this.lines.length) return;
          let result = await EscortService.fetchLineList(this.account)
          if (result?.head?.code != 200 || !Array.isArray(result?.body)) return;
          this.lines = result.body;
        }
        if (isMachineOrLineDisplay == '3') {
          if (this.machines.length) return;
          let result = await EscortService.fetchMachineListByLine({ eid: this.eid, orgIds: '' })
          if (result?.head?.code != 200 || !Array.isArray(result?.body)) return;
          this.machines = result.body;
        }
      } catch (error) {
        showToast(error?.message)
      }
    },
    async fetchGoodsBySearchValue() {
      if (this.searchValueOfGoods == '') return this.goods = []
      let result = await IVMService.searchGoodsByIDOrName(this.searchValueOfGoods)
      if (result?.code != 200) return showToast(result?.msg)
      this.goods = result.data.list ?? []
    },
    updateUserInfo(info) {

    }

  }
}

type Tree = {
  level: number
  orgId: number
  orgName: string
  sub: Tree[]

  text?: string
  value?: string
  children?: Tree[]
}
export default defineStore("useCommonData", data);