<script setup lang="ts">
import UboxH14 from "./UboxH14.vue"

const props = defineProps<{ contents: string[]; active: number }>()
</script>
<template>
  <div class="ubox-steps">
    <template v-for="(item, index) in props.contents">
      <div class="ubox-steps-dot-container" >
        <template v-if="index < active">
          <div class="ubox-steps-dot-img" :data-title="item" style="color: #3b3b3b">
            <img
              src="../assets/images/icon_progress.png"
              class="ubox-steps-dot-img"
            />
          </div>
        </template>
        <template v-else-if="index == active">
          <div class="ubox-steps-dot-img" :data-title="item" style="color: #ff7500;">
            <div class="ubox-steps-dot" style="background: #ff7500"></div>
          </div>
        </template>
        <template v-else>
          <div class="ubox-steps-dot-img" :data-title="item" style="color: #d2d2d2">
            <div class="ubox-steps-dot" style="background: #d2d2d2"></div>
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
  padding: 2px 10px;
}
.ubox-steps-dot-container {
  min-width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ubox-steps-dot {
  width: 1px;
  height: 1px;
  border-radius: 50%;
  transform: scale(8);
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
  position: relative;
}
.ubox-steps-dot-img::after {
  position: absolute;
  top: 25px;
  left: -35px;
  content: attr(data-title);
  font-size: 12px;
  min-width: 90px;
  text-align: center;
  color:attr(data-color);
  font-weight: 500;
}
</style>
