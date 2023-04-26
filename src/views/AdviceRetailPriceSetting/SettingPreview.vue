<!-- 建议零售价配置-页面预览 -->
<script lang="ts" setup>
import GoodsCard from "@/components/GoodsCard.vue"
import GoodsCardItem from "@/components/GoodsCardItem.vue"
import PageContainer from "@/components/PageContainer.vue"
import UboxH18 from "@/components/UboxH18.vue"
import Button from "@/components/Button.vue"
import useAdviceRetailPriceForm from "@/store/modules/useAdviceRetailPriceForm"
import { calcGrossMargin } from "@/util"
import UboxH14 from "@/components/UboxH14.vue"
import UboxH16 from "@/components/UboxH16.vue"
import Card from "@/components/Card.vue"
import { useRouter } from "vue-router"
import useCommonData from "@/store/modules/useCommonData"
import { ref } from "vue"
import { showSuccessToast, showToast } from "vant"
import UboxCell from "@/components/UboxCell.vue"
const advicePriceForm = useAdviceRetailPriceForm()
const commonData = useCommonData()
const router = useRouter()
const submitLoading = ref()
function onUpdateBtnClick() {
  router.back()
}
async function onSubmitBtnClick() {
  try {
    submitLoading.value = true
    await advicePriceForm.submitForm({
      submitter: commonData.account,
      uin: commonData.account,
    })
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
    console.log(error)

    showToast(error?.message)
  } finally {
    submitLoading.value = false
  }
}
</script>
<template>
  <PageContainer>
    <template #default>
      <UboxH18 class="machine-preview-title">基础信息</UboxH18>
      <Card>
        <UboxCell title="分公司" :value="advicePriceForm.orgIdName" />
        <UboxCell title="生效月份" :value="advicePriceForm.effectiveMonthStr" />
        <UboxCell title="申请原因" :value="advicePriceForm.remark" />
      </Card>

      <UboxH18 class="machine-preview-title">商品信息</UboxH18>
      <Card>
        <template
          v-for="item in advicePriceForm.productInfoList"
          :key="item.id"
        >
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
                  >成本价:
                  <UboxH16 color="#3b3b3b" :weight="500">
                    ¥ {{ item.costPrice }}
                  </UboxH16>
                </UboxH14>
                <UboxH14 color="#737373"
                  >&nbsp&nbsp&nbsp&nbsp建议零售价:
                  <UboxH16 color="#3b3b3b" :weight="500">
                    ¥ {{ item.retailPrice }}
                  </UboxH16>
                </UboxH14>
              </Row>
              <Row>
                <UboxH14 color="#737373"
                  >毛利率(%):
                  <UboxH16 color="#3b3b3b" :weight="500">
                    {{ calcGrossMargin(item.costPrice, item.retailPrice) }}%
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
          <Button @click="onUpdateBtnClick" border backgroundColor="#ffffff">
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
<style scoped>
.goods-img {
  width: 60px;
  height: 60px;
  margin-right: 5px;
}
.machine-preview-row {
  padding: 3px 8px 12px;
}
.machine-preview-title {
  margin: 12px 16px;
}
.page-footer {
  height: 100%;
  margin: 0 16px;
}
.sp-card-container {
  padding: 23px 0px;
}
.desc-space {
  padding-bottom: 12px;
}
</style>
