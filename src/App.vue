<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue'
const route = useRoute()
</script>

<template>
  <Header />
  <div :class="{ 'main-wrapper': true, 'not-padding': route.name === 'house' }">
    <RouterView />
  </div>
</template>

<style scoped>
.main-wrapper {
  padding: 0 20px 10px 20px;
  margin-top: 75px;
}
@media (max-width: 800px) {
  .main-wrapper {
    padding: 0 10px;
    margin-top: 0;
  }
  .not-padding {
    padding: 0;
  }
}
</style>
