<script setup lang="ts">
import { useRouter } from "vue-router"
import PageContainer from "@/components/PageContainer.vue"
const router = useRouter()
/**
 * 零售价配置按钮点击事件
 */
function onRetailPriceBtnClick() {
  const fullpath = router.currentRoute.value.fullPath
  const path = "/retail-price"
  const sonPath = "/retail-price/base"
  if (fullpath == path) {
    return router.push(sonPath)
  }
  router.push(path)
}

/**
 * 建议零售价申请按钮点击事件
 */
function onAdviceRetailPriceBtnClick() {
  const fullpath = router.currentRoute.value.fullPath
  const path = "/advice-retail-price"
  const sonPath = "/advice-retail-price/base"
  if (fullpath == path) {
    return router.push(sonPath)
  }
  router.push(path)
}
</script>
<template>
  <PageContainer>
    <div>
      <div>
        零售价配置:可通过该功能单个或批量设置机器商品的零售价！更多操作请“<a>查看详情</a>”
      </div>
      <div>
        建议零售价申请:当商品无合约价时,可通过该功能设置分公司商品建议零售价！更多操作请“<a>查看详情</a>”
      </div>
      <button @click="onRetailPriceBtnClick">零售价配置</button>
      <button @click="onAdviceRetailPriceBtnClick">建议零售价申请</button>
    </div>
  </PageContainer>
</template>
