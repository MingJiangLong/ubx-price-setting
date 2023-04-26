<script setup lang="ts">
import { useRouter } from "vue-router"
import { NavBar } from "vant"
import { onMounted, ref, useSlots } from "vue"

const router = useRouter()
let navTitle = ref("零售价配置")
let haveLeftArrow = ref<any>(false)
function onLeftClick() {
  router.back()
}
const slots = useSlots()
onMounted(() => {
  const to = router.currentRoute.value
  navTitle.value = `${to.meta?.navTitle ?? ""}`
  let currentPath = `${to.fullPath || ""}`
  if (
    ["/retail-price", "/advice-retail-price"].some(item => item == currentPath)
  ) {
    haveLeftArrow.value = false
  } else {
    haveLeftArrow.value = true
  }
})
</script>

<template>
  <div class="page-container-home">
    <!-- <NavBar
      :title="navTitle"
      :left-arrow="haveLeftArrow"
      @click-left="onLeftClick"
    ></NavBar> -->
    <div class="page-container">
      <slot></slot>
    </div>
    <div class="container-modal" v-if="slots['bottom-modal']">
      <slot name="bottom-modal"></slot>
    </div>
    <div v-if="slots.footer" class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.page-container-home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  position: relative;
}
.page-container {
  flex: 1;
  overflow-y: scroll;
  background: #f4f6f8;
  padding: 0 8px;
  position: relative;
}
.read-the-docs {
  color: #888888;
}
.footer {
  background: #ffffff;
  height: 66px;
}
.container-modal {
  position: absolute;
  bottom: 66px;
  left: 0;
  width: 100vw;
  font-size: 14px;
  background: #ffffff;
}
</style>
