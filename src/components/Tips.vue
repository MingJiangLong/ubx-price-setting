<script setup lang="ts">
import {} from "vue"
import UboxH14 from "./UboxH14.vue"
const props = defineProps<{ tips?: string }>()
</script>
<!-- icon_tips_red -->
<template>
  <div class="tip-container">
    <img src="../assets/images/icon_tips_red.png" class="img-setting" />
      <UboxH14 color="#ff7500">
        {{ props?.tips }}
      </UboxH14>
  </div>
</template>

<style scoped>
.img-setting {
  width: 13px;
  height: 13px;
  margin-bottom: -1px;
  margin-right: 3px;
}
.tip-container {
  /* margin: 1em 0; */
  line-height: .4rem !important;
}
</style>
