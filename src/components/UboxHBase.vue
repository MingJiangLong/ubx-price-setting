<script setup lang="ts">
import { CSSProperties } from "vue"
import { computed } from "vue"
const props = defineProps<{
  type: "14" | "16" | "18" | "17"
  weight?: number
  color?: string
  style?: CSSProperties
}>()
</script>
<template>
  <label
    :class="`h${props.type ?? 14}-font`"
    :style="{
      color: props?.color ?? 'black',
      fontWeight: props.weight ?? 400,
      ...props.style,
    }"
  >
    <slot></slot>
  </label>
</template>

<style scoped>
.uboxh1-font {
  /* 14px */
  font-size: 1rem;
}
.h14-font {
  font-size: 14px;
  /* line-height: 14px; */
}
.h16-font {
  font-size: 16px;
  /* line-height: 16px; */
}
.h17-font {
  font-size: 17px;
  /* line-height: 17px; */
}
.h18-font {
  font-size: 18px;
  /* line-height: 18px; */
}
:root{
  --van-text-ellipsis-line-height: 0;
}
</style>
