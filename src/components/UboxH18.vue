<script setup lang="ts">
import { CSSProperties } from "vue"
import UboxBase from "./UboxHBase.vue"
const props = defineProps<{
  color?: string
  style?: CSSProperties
  weight?: number
}>()
</script>
<template>
  <UboxBase
    type="18"
    :color="props.color"
    :weight="props.weight"
    :style="props.style"
  >
    <slot></slot>
  </UboxBase>
</template>
<style scoped>

</style>
