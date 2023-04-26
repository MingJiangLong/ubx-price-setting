<script setup lang="ts">
import { CSSProperties } from "vue"
const props = defineProps<{
  containerStyle?: CSSProperties
}>()
</script>

<template>
  <div class="card-container" :style="props.containerStyle">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-container {
  margin-top: 12px ;
  padding: 15px 14px;
  border-radius: 8px;
  background: #fff;
}
</style>
