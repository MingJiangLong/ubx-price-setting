<script setup lang="ts">
import { RadioGroup, Radio, showToast } from "vant"
import { useRouter } from "vue-router"
import PageContainer from "@/components/PageContainer.vue"
import UboxSteps from "@/components/UboxSteps.vue"
import useRetailPriceForm from "../../store/modules/useRetailPriceForm"
import Card from "@/components/Card.vue"
import Button from "@/components/Button.vue"
import Tips from "@/components/Tips.vue"

import { onMounted } from "vue"
import UboxH18 from "@/components/UboxH18.vue"
import UboxH16 from "@/components/UboxH16.vue"
import useCommonData from "@/store/modules/useCommonData"
import { getEid, getLoginName } from "@/util"
const router = useRouter()
const retailForm = useRetailPriceForm()
const commonData = useCommonData()
/**
 * 下一步点击事件
 */
function onNextStepClick() {
  if (!retailForm.name.length) return showToast("请填写调价单名称!")
  if (retailForm.name.length > 20) return showToast("调价单名称长度不超过20")
  router.push("/retail-price/machine-choice")
}
onMounted(() => {
  commonData.updateUserInfo(getLoginName(), getEid())
})
</script>
<!-- 零售价配置-基础信息配置 -->
<template>
  <PageContainer>
    <template #default>
      <Card>
        <UboxSteps
          :contents="['基础信息', '选择机器', '商品调价']"
          :active="0"
        />
      </Card>
      <Card>
        <Field
          placeholder="请简要填写"
          v-model="retailForm.name"
          label="调价单名称"
        >
        </Field>
        <Field label="生效方式">
          <template #input>
            <RadioGroup direction="horizontal" v-model="retailForm.workType">
              <Radio name="3">
                <UboxH16 color="#3b3b3b" :weight="500">下次补货生效</UboxH16>
                <template #icon="props">
                  <img
                    class="base-radio-img"
                    v-if="props.checked"
                    src="../../assets/images/btn_radio_h.png"
                  />
                  <img
                    class="base-radio-img"
                    v-else
                    src="../../assets/images/btn_radio_n.png"
                  />
                </template>
              </Radio>
              <Radio name="2">
                <UboxH16 color="#3b3b3b" :weight="500">立即生效</UboxH16>
                <template #icon="props">
                  <img
                    class="base-radio-img"
                    v-if="props.checked"
                    src="../../assets/images/btn_radio_h.png"
                  />
                  <img
                    class="base-radio-img"
                    v-else
                    src="../../assets/images/btn_radio_n.png"
                  />
                </template>
              </Radio>
            </RadioGroup>
          </template>
        </Field>
        <div class="bs-tip" v-if="retailForm.workType == '2'">
          <Tips
            tips="立即生效可能会导致货柜商品生效价格和标签不一致,配置前请先确认运营员在现场可打价签!"
          />
        </div>
      </Card>
    </template>

    <template #footer>
      <div class="bis-footer">
        <Button @click="onNextStepClick">
          <UboxH18 color="#ffffff">下一步</UboxH18>
        </Button>
      </div>
    </template>
  </PageContainer>
</template>
<style scoped lang="less">
.base-radio-img {
  width: 15px;
  height: 15px;
}

:deep(.van-field__control) {
  font-size: 16px;
  font-weight: 500;
}
:deep(.van-field__label) {
  font-size: 16px;
  color: #868686;
}
.bis-footer {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 16px;
}
.bs-tip {
  margin: 15px 16px;
}
</style>
