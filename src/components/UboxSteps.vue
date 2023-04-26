<script setup lang="ts">
import UboxH14 from "./UboxH14.vue"

const props = defineProps<{ contents: string[]; active: number }>()
</script>
<template>
  <div class="ubox-steps">
    <template v-for="(item, index) in props.contents">
      <div class="ubox-steps-dot-container">
        <template v-if="index < active">
          <img
            src="../assets/images/icon_progress.png"
            class="ubox-steps-dot-img"
          />
          <div class="ubox-steps-font" style="color: #111; padding-top: 10px">
            <UboxH14 color="#3b3b3b">
              {{ item }}
            </UboxH14>
          </div>
        </template>
        <template v-else-if="active == index">
          <div class="ubox-steps-dot-img">
            <div class="ubox-steps-dot" style="background: #ff7500"></div>
          </div>
          <div
            class="ubox-steps-font"
            style="color: #ff7500; padding-top: 10px"
          >
            <UboxH14 color="#ff7500">
              {{ item }}
            </UboxH14>
          </div>
        </template>
        <template v-else>
          <div class="ubox-steps-dot-img">
            <div class="ubox-steps-dot" style="background: #d2d2d2"></div>
          </div>
          <div
            class="ubox-steps-font"
            style="color: #d2d2d2; padding-top: 10px"
          >
            <UboxH14>
              {{ item }}
            </UboxH14>
          </div>
        </template>
      </div>
      <div
        class="ubox-step-line"
        :style="{
          'border-bottom':
            +props.active > index ? '1px solid #ff7500' : '1px dashed #d2d2d2',
        }"
        v-if="index != props.contents.length - 1"
      ></div>
    </template>
  </div>
</template>

<style scoped>
.ubox-steps {
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 2px 3.4%;
}
.ubox-steps-dot-container {
  min-width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ubox-steps-dot {
  width: 8px;
  height: 8px;
  border-radius: 8px;
}

.ubox-step-line {
  height: 8px;
  flex: 1;
  margin-bottom: 3px;
}

.ubox-steps-font {
  color: #d2d2d2 100%;
  font-size: 14px;
  font-weight: 500;
}
.ubox-steps-dot-img {
  width: 18px;
  height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
