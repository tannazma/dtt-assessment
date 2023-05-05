<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="main-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.main-wrapper {
  padding: 0 20px;
}
@media (min-width: 1024px) {
  .main-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }
}
</style>
