<template>
  <Card>
    <Row align="center">
      <Col>
        <img :src="props.imgUrl" class="goods-img" />
      </Col>
      <Col>
        <template v-for="(item, key) in props.desc" :key="key">
          <Row v-if="key !== props.desc.length - 1" class="desc-space">
            <UboxH16>{{ item }}</UboxH16>
          </Row>
          <Row v-else>
            <UboxH16>{{ item }}</UboxH16>
          </Row>
        </template>
      </Col>
    </Row>
  </Card>
</template>

<script setup lang="ts">
import Card from "./Card.vue"
import {} from "vue"
import UboxH16 from "./UboxH16.vue"
import { useSlots } from "vue"
const props = defineProps<{
  imgUrl: string
  desc: string[]
}>()
</script>
<style scoped>
.goods-img {
  width: 60px;
  height: 60px;
}
.desc-space {
  padding-bottom: 12px;
}
</style>
