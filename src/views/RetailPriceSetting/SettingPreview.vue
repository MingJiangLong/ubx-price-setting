<script setup lang="ts">
import { useRouter } from "vue-router"
import PageContainer from "@/components/PageContainer.vue"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import { Cell, showSuccessToast, showToast } from "vant"
import useRetailPriceForm from "@/store/modules/useRetailPriceForm"
import UboxH16 from "@/components/UboxH16.vue"
import UboxH18 from "@/components/UboxH18.vue"
import UboxH14 from "@/components/UboxH14.vue"
import UboxCell from "@/components/UboxCell.vue"

import { ref } from "vue"
const retailForm = useRetailPriceForm()
const router = useRouter()
const submitLoading = ref()
async function onSubmitBtnClick() {
  try {
    submitLoading.value = true
    await retailForm.submitForm()
    showSuccessToast("提交成功,3s后自动返回首页")
    setTimeout(() => {
      try {
        let data = { code: 10003, msg: "关闭当前页面", data: {} }
        // @ts-ignore
        window.ucloud.postMessage(JSON.stringify(data))
      } catch (error) {
        console.log("返回首页失败")
      }
    }, 1000 * 3)
  } catch (error) {
    showToast(error?.message)
  } finally {
    submitLoading.value = false
  }
}
function onUpdateBtnClick() {
  router.back()
}
</script>
<!-- 零售价配置-设置预览 -->
<template>
  <PageContainer>
    <template #default>
      <UboxH18 class="machine-preview-title">基础信息</UboxH18>
      <Card>
        <UboxCell title="调价单名称" :value="retailForm.name" />
        <UboxCell
          title="生效方式"
          :value="retailForm.workType == '3' ? '下次补货生效' : '立即生效'"
        />
      </Card>
      <UboxH18 class="machine-preview-title">机器信息</UboxH18>
      <Card v-if="retailForm.isMachineOrLineDisplay == '1'">
        <Row>
          <UboxH16 :weight="500">按线路选择</UboxH16>
        </Row>

        <Row class="machine-preview-row">
          <UboxH16 color="#868686">
            {{ retailForm.linesCheckedName.join("、") }}
          </UboxH16>
        </Row>
      </Card>
      <Card v-else>
        <Row>
          <div style="flex: 1">
            <UboxH16 :weight="500">按机器选择</UboxH16>
          </div>
          <div>
            <UboxH16 :weight="500"
              >共{{ retailForm.machineCheckedId.length }}台</UboxH16
            >
          </div>
        </Row>

        <Row class="machine-preview-row">
          <UboxH16 color="#868686">
            {{ retailForm.machineCheckedIdsStr }}
          </UboxH16>
        </Row>
      </Card>
      <UboxH18 class="machine-preview-title">商品信息</UboxH18>
      <Card>
        <template v-for="item in retailForm.goods" :key="item.id">
          <Row align="center" class="sp-card-container van-hairline--bottom">
            <img :src="item.product_img" class="goods-img" />
            <Col span="16">
              <Row class="desc-space">
                <UboxH16 :weight="500">{{ item.full_name }}</UboxH16>
              </Row>
              <Row class="desc-space">
                <UboxH14 color="#737373">商品ID: {{ item.id }}</UboxH14>
              </Row>
              <Row class="desc-space">
                <UboxH14 color="#737373"
                  >价格:
                  <UboxH16 color="#3b3b3b" :weight="500">
                    ¥ {{ item.price }}
                  </UboxH16>
                </UboxH14>
              </Row>
            </Col>
          </Row>
        </template>
      </Card>
    </template>
    <template #footer>
      <Row gutter="10" align="center" class="page-footer">
        <Col span="8">
          <Button @click="onUpdateBtnClick" backgroundColor="#ffffff" border>
            <UboxH18 color="#929292">修改</UboxH18>
          </Button>
        </Col>
        <Col span="16">
          <Button @click="onSubmitBtnClick" :loading="submitLoading">
            <UboxH18 color="#ffffff">提交</UboxH18>
          </Button>
        </Col>
      </Row>
    </template>
  </PageContainer>
</template>
<style scoped lang="less">
.goods-img {
  width: @goods-img;
  height: @goods-img;
  margin-right: 5px;
}
.machine-preview-row {
  padding-top: 5px;
}
.machine-preview-title {
  padding: 12px 16px;
}
.page-footer {
  height: 100%;
  margin: 0 16px;
}
.desc-space {
  padding-bottom: 12px;
}
.sp-card-container {
  margin: 23px 12px;
}

.machines-num {
  color: @yellow;
}
</style>
