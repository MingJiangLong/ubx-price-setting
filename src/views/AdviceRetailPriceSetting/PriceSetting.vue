<!-- 建议零售价配置-价格调整-->
<script lang="ts" setup>
import PageContainer from "@/components/PageContainer.vue"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import { useRouter } from "vue-router"
import UboxH16 from "@/components/UboxH16.vue"
import UboxSteps from "@/components/UboxSteps.vue"
import Tips from "@/components/Tips.vue"
import { Search, showToast } from "vant"
import UboxH18 from "@/components/UboxH18.vue"
import useAdviceRetailPriceForm from "@/store/modules/useAdviceRetailPriceForm"
import UboxH14 from "@/components/UboxH14.vue"
import { calcGrossMargin } from "@/util"
const router = useRouter()
const adviceRetailForm = useAdviceRetailPriceForm()
const contents = ["基础信息", "配置建议零售价"]
function onPreStepClick() {
  router.back()
}
function onConfirmSetting() {
  if (!adviceRetailForm.productInfoList.length)
    return showToast("尚未添加商品,请添加商品")
  router.push("/advice-retail-price/setting-preview")
}

/**
 * 去搜索页
 */
function goSearchPage() {
  router.push("/advice-retail-price/search-goods")
}

function deleteAddedGoods(id) {
  adviceRetailForm.removeGoods(id)
}
</script>
<template>
  <PageContainer>
    <template #default>
      <!-- <TimePicker /> -->
      <div class="card-container-special">
        <UboxSteps :contents="contents" :active="1" />
      </div>
      <Card>
        <Search
          placeholder="请输入商品ID或者商品名称搜索"
          disabled
          @click="goSearchPage"
        />
        <div
          v-if="!adviceRetailForm.productInfoList.length"
          class="empty-container"
        >
          <img
            src="../../assets/images/empty_seachgoods.png"
            class="search-img"
          />
          <UboxH14 :weight="500">请点击上方搜索栏</UboxH14>
          <UboxH14 :weight="500">搜索添加调价商品</UboxH14>
        </div>
        <List>
          <Card v-for="item in adviceRetailForm.productInfoList" :key="item.id">
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
                    >成本价: {{ item.costPrice }}元</UboxH14
                  >
                </Row>
                <Row class="desc-space">
                  <UboxH14 color="#737373"
                    >建议零售价: {{ item.retailPrice }}元</UboxH14
                  >
                </Row>
                <Row>
                  <UboxH14 color="#737373"
                    >毛利率(%):
                    {{
                      calcGrossMargin(item.costPrice, item.retailPrice)
                    }}%</UboxH14
                  >
                </Row>
                <Row
                  v-if="calcGrossMargin(item.costPrice, item.retailPrice) < 40"
                >
                  <Tips tips="毛利率低于40%，需区总审批" />
                </Row>
              </Col>
              <img
                src="../../assets/images/btn_delete.png"
                @click="deleteAddedGoods(item.id)"
                class="delete-img"
              />
            </Row>
          </Card>
        </List>
      </Card>
    </template>
    <template #footer>
      <Row gutter="10" align="center" class="page-footer">
        <Col span="8">
          <Button @click="onPreStepClick" border backgroundColor="#ffffff">
            <UboxH18 color="#929292">上一步</UboxH18>
          </Button>
        </Col>
        <Col span="16">
          <Button @click="onConfirmSetting">
            <UboxH18 color="#ffffff">确认</UboxH18>
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
.delete-img {
  width: 18px;
  height: 18px;
}
.page-footer {
  height: 100%;
  margin: 0 16px;
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  padding-bottom: 2em;
}
.search-img {
  width: 150px;
  height: 150px;
}
.desc-space {
  padding-bottom: 8px;
}
:deep(.van-search__content) {
  border-radius: 1em;
}
.sp-card-container {
  padding: 12px 0;
}
</style>
