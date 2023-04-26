<script lang="ts" setup>
</script>
<template>
  <router-view></router-view>
</template>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}
.container {
  flex: 1;
  margin: 2em 0;

  overflow-y: scroll;
}
</style>
