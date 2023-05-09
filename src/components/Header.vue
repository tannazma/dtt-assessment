<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header-container">
    <img width="100" src="/src/assets/img_logo_dtt@3x.png" alt="dtt logo" />
    <RouterLink class="list" to="/list">Houses</RouterLink>
    <RouterLink class="about" to="/about">About</RouterLink>
  </div>
</template>

<style scoped>
.header-container {
  padding: 20px 30px;
  display: flex;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  height: 75px;
  z-index: 1;
}

.list {
  align-content: space-between;
  margin: 0 50px;
  color: #c3c3c3;
}
.about {
  color: #c3c3c3;
}
.router-link-exact-active {
  color: black;
  font-weight: bold;
}

@media (max-width: 800px) {
  .header-container {
    display: none;
  }
}
</style>
