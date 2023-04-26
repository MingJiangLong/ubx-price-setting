<template>
  <div class="machine-panel-container">
    <Row gutter="20" class="panel-operator">
      <Col span="18">
        <UboxH14 color="#787878">
          已选中
          <UboxH14 color="#FF7500">{{
            retailForm.machineChecked.length
          }}</UboxH14>
          台
        </UboxH14>
      </Col>
      <Col span="6" style="text-align: right" @click="showMore = !showMore">
        <UboxH14 color="#FF7500">{{ showMore ? "收起" : "查看全部" }}</UboxH14>
      </Col>
    </Row>
    <Row justify="center">
      <div class="panel-input" v-if="!showMore">
        <TextEllipsis :content="retailForm.machineCheckedIdsStr" />
      </div>
      <div class="panel-input-more" v-else>
        {{ retailForm.machineCheckedIdsStr }}
      </div>
    </Row>
  </div>
</template>

<script setup>
import useRetailPriceForm from "@/store/modules/useRetailPriceForm"
import { ref } from "vue"
import UboxH14 from "./UboxH14.vue"
import { TextEllipsis } from "vant"
const retailForm = useRetailPriceForm()

const showMore = ref(false)
</script>

<style lang="less" scoped>
.machine-panel-container {
  min-height: 10vh;
}
.machine-num {
  color: @yellow;
}
.panel-input {
  width: 335px;
  height: 37px;
  border: 0.5px solid #d1d4de;
  border-radius: 4px;
  padding: 0 11px;

}
.panel-input-more {
  width: 345px;
  height: 284px;
  border: 0.5px solid #d1d4de;
  border-radius: 4px;
  padding: 11px;
  overflow-y: scroll;
  word-break: break-all;
}
.panel-operator {
  padding: 16px 14px;
}
:deep(.van-text-ellipsis) {
  padding: 11px 0;
}
</style>
