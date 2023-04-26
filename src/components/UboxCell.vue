<template>
  <Cell @click="onClick">
    <template #title>
      <UboxH16 color="#868686">{{ props.title }}</UboxH16>
    </template>
    <template #value>
      <UboxH16>{{ props.value }}</UboxH16>
    </template>
  </Cell>
</template>

<script setup lang="ts">
import { computed } from "vue"
import UboxH16 from "@/components/UboxH16.vue"
import { Cell } from "vant"
const emits = defineEmits<{
  (e: "click"): void
}>()

const onClick = computed(() => {
  return () => emits("click")
})
const props = defineProps<{
  title?: string
  value?: string
  placeholder?: string
}>()
</script>

<style lang="scss" scoped></style>
