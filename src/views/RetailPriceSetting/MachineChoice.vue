<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue"
import { useRouter } from "vue-router"
import PageContainer from "@/components/PageContainer.vue"
import useRetailPriceForm from "@/store/modules/useRetailPriceForm"
import useCommonData from "@/store/modules/useCommonData"
import Card from "@/components/Card.vue"
import Button from "@/components/Button.vue"
import {
  Search,
  Tab,
  Tabs,
  List,
  Cell,
  CheckboxGroup,
  Checkbox,
  showToast,
  Sticky,
} from "vant"
import { computed } from "vue"
import UboxSteps from "@/components/UboxSteps.vue"
import UboxH18 from "@/components/UboxH18.vue"
import UboxH16 from "@/components/UboxH16.vue"
import UboxH14 from "@/components/UboxH14.vue"
import IVMService from "@/api/service/IVMService"
import EscortService from "@/api/service/EscortService"
import MachinePanel from "@/components/MachinePanel.vue"
const router = useRouter()
const retailForm = useRetailPriceForm()
const commonData = useCommonData()
const linesLoading = ref()
const machinesLoading = ref()
const nextStepLoading = ref()

// 机器列表分页
const pageIndexOfMachine = ref(1)

// 线路分页列表
const pageIndexOfLine = ref(1)
/**
 * 下一步点击事件
 * 有异步事件
 */
async function onNextStepClick() {
  try {
    nextStepLoading.value = true
    if (retailForm.machineChecked.length > 200)
      return showToast("选择机器数不能大于200台")
    // 判断是否机器支持纸硬币
    let machines = []

    // 选择线路 需要根据线路查出机器
    if (retailForm.isMachineOrLineDisplay === "1") {
      let result = await IVMService.isMachinesNotGreaterThan200(
        retailForm.linesCheckedIdWithout6
      )
      if (result?.code != 200) return showToast(result?.msg)

      let tempt = await EscortService.fetchMachineListByLine({
        eid: commonData.eid,
        orgIds: retailForm.linesCheckedIdWithout6.join(","),
      })
      if (tempt?.head?.code != 200) return showToast(tempt?.head?.desc)
      let arr = tempt?.body
      machines = Array.isArray(arr) ? arr.map(item => `${item.vmCode}`) : []
      if(!machines.length) return showToast('所选线路下没有机器!')
    } else {
      machines = retailForm.machineCheckedId
    }
    // 校验是否支持纸硬币
    let respOfPaperCoin = await IVMService.isSupportPaperCoin(machines)
    if (respOfPaperCoin?.code != 200) return showToast(respOfPaperCoin?.msg)
    retailForm.updateIsPaperCoin(respOfPaperCoin?.data?.is_support)
    router.push("/retail-price/price-adjust")
  } catch (error) {
    showToast(error?.message)
  } finally {
    nextStepLoading.value = false
  }
}

/**
 * 上一步点击事件
 */
function onPreStepClick() {
  router.back()
}

const isBtnDisable = computed(() => {
  if (
    retailForm.isMachineOrLineDisplay == "1" &&
    retailForm.linesChecked.length
  )
    return false
  if (
    retailForm.isMachineOrLineDisplay == "3" &&
    retailForm.machineChecked.length
  )
    return false
  return true
})

/**机器和线路只能二选一 */
watch(
  () => retailForm.isMachineOrLineDisplay,
  newValue => {
    if (newValue == "1") {
      retailForm.machineChecked = []
    }
    if (newValue == "3") {
      retailForm.linesChecked = []
    }
  }
)

// TAB变化拉去数据
watch(
  () => retailForm.isMachineOrLineDisplay,
  async newValue => {
    if (newValue == "1") linesLoading.value = true
    if (newValue == "3") machinesLoading.value = true
    await commonData.fetchMachineOrLines()
    if (newValue == "1") linesLoading.value = false
    if (newValue == "3") machinesLoading.value = false

    pageIndexOfMachine.value = 1
    pageIndexOfLine.value = 1
  },
  {
    immediate: true,
  }
)

const paginationMachines = computed(() => {
  return commonData.filteredMachines.slice(0, pageIndexOfMachine.value * 10)
})
const paginationLine = computed(() => {
  return commonData.filteredLines.slice(0, pageIndexOfLine.value * 10)
})

// 搜索重置页码
watch(
  () => commonData.searchValueOfLine,
  () => {
    pageIndexOfLine.value = 1
  }
)
watch(
  () => commonData.searchValueOfMachine,
  () => {
    pageIndexOfMachine.value = 1
  }
)
</script>
<!-- 零售价配置-机器选择 -->
<template>
  <PageContainer>
    <template #default>
      <div class="machine-choice-container">
        <Card>
          <UboxSteps
            :contents="['基础信息', '选择机器', '商品调价']"
            :active="1"
          />
        </Card>
        <Tabs v-model:active="retailForm.isMachineOrLineDisplay">
          <Card>
            <Tab name="1">
              <template #title>
                <UboxH18
                  :color="
                    retailForm.isMachineOrLineDisplay == '1'
                      ? '#3b3b3b'
                      : '#868686'
                  "
                  >按线路选择</UboxH18
                >
              </template>
              <Search
                placeholder="请输入线路名称搜索"
                v-model:model-value="commonData.searchValueOfLine"
              />
              <List
                :loading="linesLoading"
                class="list-container"
                @load="pageIndexOfLine += 1"
              >
                <CheckboxGroup
                  v-model="retailForm.linesChecked"
                  style="border-radius: 0.1em"
                >
                  <Row
                    v-for="(item, key) in commonData.filteredLines"
                    :key="item.lineId"
                    class="list-item van-hairline--bottom"
                  >
                    <Checkbox
                      :name="`${item.lineId};${item.lineName}`"
                      shape="square"
                      checked-color="rgb(255,117,0)"
                      style="margin-right: 0.5em"
                    />
                    <UboxH16 :weight="500">
                      {{ item.lineName }}
                    </UboxH16>
                  </Row>
                </CheckboxGroup>
              </List>
            </Tab>
            <Tab name="3">
              <template #title>
                <UboxH18
                  :color="
                    retailForm.isMachineOrLineDisplay == '3'
                      ? '#3b3b3b'
                      : '#868686'
                  "
                  >按机器选择</UboxH18
                >
              </template>
              <Search
                placeholder="请输入机器编号搜索"
                v-model:model-value="commonData.searchValueOfMachine"
              />
              <List
                :loading="machinesLoading"
                class="list-container"
                @load="pageIndexOfMachine += 1"
              >
                <CheckboxGroup v-model="retailForm.machineChecked">
                  <Row
                    v-for="(item, key) in paginationMachines"
                    :key="item.vmCode"
                    :title="item.modelName"
                    align="center"
                    class="list-item van-hairline--bottom"
                  >
                    <Col span="3">
                      <Checkbox
                        :name="`${item.nodeId};${item.vmCode}`"
                        shape="square"
                        checked-color="rgb(255,117,0)"
                      ></Checkbox>
                    </Col>
                    <Col span="21">
                      <Row>
                        <UboxH18>
                          {{ item.vmCode }}
                        </UboxH18>
                      </Row>
                      <Row>
                        <UboxH14 color="#737373">
                          {{ item.nodeName }}
                        </UboxH14>
                      </Row>
                    </Col>
                  </Row>
                </CheckboxGroup>
              </List>
            </Tab>
          </Card>
        </Tabs>
      </div>
    </template>
    <template #bottom-modal v-if="retailForm.isMachineOrLineDisplay == '3'">
      <MachinePanel />
    </template>
    <template #footer>
      <Row gutter="10" align="center" class="page-footer">
        <Col span="8">
          <Button @click="onPreStepClick" border backgroundColor="#fffff">
            <UboxH18 color="#929292">上一步</UboxH18>
          </Button>
        </Col>
        <Col span="16">
          <Button
            :disabled="isBtnDisable"
            @click="onNextStepClick"
            :loading="nextStepLoading"
          >
            <UboxH18 color="#ffffff">下一步</UboxH18>
          </Button>
        </Col>
      </Row>
    </template>
  </PageContainer>
</template>

<style scoped>
.machine-choice-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.vmcode-font {
  font-size: 1.28rem;
  color: #3b3b3b;
  font-weight: 500;
}
.node-font {
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #737373;
  font-weight: 400;
}
.list-item {
  padding: 22px 0;
}
.list-container {
  margin: 0 8px;
  min-height: 180px;
}
.page-footer {
  height: 100%;
  margin: 0 16px;
}
:deep(.van-icon) {
  border-radius: 0.2em;
}
:deep(.van-search__content) {
  border-radius: 1em;
}
/* line-height: 18rem; */

:deep(.van-tabs) {
  position: static;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
}

:deep(.van-tabs__content) {
  flex: 1;
  overflow-y: scroll;
}
:deep(.van-checkbox__icon) {
  /* width: 18px;
  height: 18px; */
}
</style>
