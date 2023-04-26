<script setup lang="ts">
import { useRouter } from "vue-router"
import PageContainer from "@/components/PageContainer.vue"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import { Search, List, Popup, showToast } from "vant"
import useCommonData from "@/store/modules/useCommonData"
import { ref, watchEffect } from "vue"
import { reactive } from "vue"
import useRetailPriceForm from "@/store/modules/useRetailPriceForm"
import UboxSteps from "@/components/UboxSteps.vue"
import UboxH18 from "@/components/UboxH18.vue"
import UboxH14 from "@/components/UboxH14.vue"
import UboxH16 from "@/components/UboxH16.vue"
const router = useRouter()
const commonData = useCommonData()
const retailForm = useRetailPriceForm()
/**
 * 提交点击事件
 */
function onSubmitClick() {
  if (!retailForm.goods.length) return showToast("请添加要调价商品!")
  router.push("/retail-price/setting-preview")
}

/**
 * 上一步点击事件
 */
function onPreStepClick() {
  router.back()
}

/**
 * 去搜索页
 */
function goSearchPage() {
  router.push("/retail-price/search-goods")
}

/**
 * 移除已添加的商品
 * @param id
 */
function deleteAddedGoods(id) {
  retailForm.removeGoods(id)
}
</script>
<!-- 零售价配置-价格调整 -->
<template>
  <PageContainer>
    <template #default>
      <Card>
        <UboxSteps
          :contents="['基础信息', '选择机器', '商品调价']"
          :active="2"
        />
      </Card>
      <Card>
        <Search
          placeholder="请输入商品ID或者商品名称搜索"
          disabled
          @click="goSearchPage"
        />
        <div v-if="!retailForm.goods.length" class="empty-container">
          <img
            src="../../assets/images/empty_seachgoods.png"
            class="search-img"
          />
          <UboxH14 :weight="500">请点击上方搜索栏</UboxH14>
          <UboxH14 :weight="500">搜索添加调价商品</UboxH14>
        </div>
        <List>
          <Card >
            <Row align="center" v-for="item in retailForm.goods" :key="item.id" class="sp-card-container van-hairline--bottom">
              <img :src="item.product_img" class="goods-img" />
              <Col span="16">
                <Row class="desc-space">
                  <UboxH16 :weight="500">{{ item.full_name }}</UboxH16>
                </Row>
                <Row class="desc-space">
                  <UboxH14 color="#737373">商品ID:{{ item.id }}</UboxH14>
                </Row>
                <Row>
                  <UboxH14 color="#737373">调整价格:{{ item.price }}元</UboxH14>
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
          <Button @click="onSubmitClick">
            <UboxH18 color="#ffffff">提交</UboxH18>
          </Button>
        </Col>
      </Row>
    </template>
  </PageContainer>
</template>
<style scoped>
.price-adjust-modal {
  width: calc(0.8 * 100vw);
  height: calc(0.3 * 100vh);
  background: white;
  border-radius: 3em;
  display: flex;
  flex-direction: column;
}
.goods-img {
  width: 60px;
  height: 60px;
}
.price-adjust-modal-title {
  font-size: 1.4rem;
  color: #ff7500;
  letter-spacing: 0;
  text-align: center;
  padding: 1em 0;
  background: rgb(255, 240, 227);
}
.search-img {
  width: 150px;
  height: 150px;
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  padding-bottom: 2em;
}

.desc-space {
  padding-bottom: 12px;
}
.sp-card-container {
  padding: 12px 0;
}
.page-footer {
  height: 100%;
  margin: 0 16px;
}
:deep(.van-search__content) {
  border-radius: 1em;
}
</style>
