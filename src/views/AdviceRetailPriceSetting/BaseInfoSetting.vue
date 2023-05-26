<script lang="ts" setup>
import PageContainer from "@/components/PageContainer.vue"
import Card from "@/components/Card.vue"
import Button from "@/components/Button.vue"
import UboxSteps from "@/components/UboxSteps.vue"
import { useRouter } from "vue-router"
import { Popup, TimePicker, DatePicker, showToast, Picker } from "vant"
import { ref } from "vue"
import { onMounted } from "vue"
import useCommonData from "@/store/modules/useCommonData"
import useAdviceRetailPriceForm from "@/store/modules/useAdviceRetailPriceForm"
import { getEid, getLoginName } from "@/util"
const adviceRetailPriceForm = useAdviceRetailPriceForm()
const commonDate = useCommonData()
const router = useRouter()
const showDatePicker = ref(false)
const showCompanyPicker = ref(false)
/**
 * 下一步
 */
function onNextStepClick() {
  if (!adviceRetailPriceForm.orgId.length) return showToast("请选择分公司")
  if (!adviceRetailPriceForm.effectiveMonthStr.length)
    return showToast("选择生效月份")
  if (!adviceRetailPriceForm.remark.length) return showToast("填写备注")
  if (adviceRetailPriceForm.remark.length > 20)
    return showToast("备注长度不超过20")
  router.push("/advice-retail-price/price-setting")
}

/**
 * 日期选择回调
 * @param param0
 */
function onPickDate({ selectedValues }) {
  adviceRetailPriceForm.updateEffectiveMonth(selectedValues)
  showDatePicker.value = false
}

/**
 * 分公司选择回调
 * @param param0
 */
function onCompanyPick({ selectedValues }) {
  if (selectedValues?.length) {
    adviceRetailPriceForm.updateOrg4Ids(selectedValues[0])
  }
  showCompanyPicker.value = false
}
onMounted(() => {
  const date = new Date()
  let month = `${date.getMonth() + 1}`
  month = month.length < 2 ? `0${month}` : month
  onPickDate({
    selectedValues: [date.getFullYear(), month],
  })
  commonDate.updateUserInfo(getLoginName(), getEid())
  commonDate.fetchCompanyTree()
})

const contents = ["基础信息", "配置建议零售价"]
</script>
<!-- 建议零售价配置-基础信息配置 -->
<template>
  <PageContainer>
    <template #default>
      <div
        class="card-container-special"
      >
        <UboxSteps :contents="contents" :active="0" />
      </div>
      <Card>
        <Field
          label="分公司"
          required
          @click="showCompanyPicker = true"
          placeholder="点击分公司"
          readonly
          v-model="adviceRetailPriceForm.orgIdName"
        ></Field>
        <Popup :show="showCompanyPicker" position="bottom">
          <Picker
            :columns="commonDate.companyTree"
            @cancel="showCompanyPicker = false"
            @confirm="onCompanyPick"
          />
        </Popup>
        <Field
          label="生效月份"
          name="radio"
          required
          @click="showDatePicker = true"
          placeholder="点击选择生效月份"
          readonly
          v-model="adviceRetailPriceForm.effectiveMonthStr"
        />
        <Popup :show="showDatePicker" position="bottom">
          <DatePicker
            :minDate="new Date()"
            @confirm="onPickDate"
            @cancel="showDatePicker = false"
            :columnsType="['year', 'month']"
          />
        </Popup>
        <Field
          label="申请原因"
          name="radio"
          placeholder="请简要填写"
          required
          v-model="adviceRetailPriceForm.remark"
        >
        </Field>
      </Card>
    </template>
    <template #footer>
      <div class="bis-footer">
        <Button @click="onNextStepClick">下一步</Button>
      </div>
    </template>
  </PageContainer>
</template>
<style scoped>
.bis-footer {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 16px;
}
:deep(.van-field__control) {
  font-size: 16px;
  font-weight: 500;
}
:deep(.van-field__label) {
  font-size: 16px;
  color: #868686;
}
</style>
