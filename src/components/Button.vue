<script setup lang="ts">
import { CSSProperties } from "vue"
import { computed } from "vue"

const emits = defineEmits<{
  (e: "click"): void // 
}>()
const props = defineProps<{
  disabled?: boolean
  containerStyle?: CSSProperties
  loading?: boolean
  border?: boolean
  radio?: boolean
  color?: string
  backgroundColor?: string
}>()

const onClick = computed(() => {
  if (props.disabled) return () => {}
  return () => emits("click")
})
const color = computed(() => {
  if (props.disabled) return "#D1D4DE"
  return (
    props?.backgroundColor ??
    "linear-gradient(-54deg, #FF5F27 4%, #FF7500 100%)"
  )
})
</script>

<template>
  <Button
    :color="color"
    :loading="props.loading"
    loading-type="spinner"
    block
    round
    @click="onClick"
    :style="{
      border: props.border ? '1px solid #D1D4DE' : 'none',
      color: props.color ?? '#ffffff',
      ...props.containerStyle,
    }"
  >
    <slot></slot>
  </Button>
</template>
