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

<style>
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
  color: black;
}
.about {
  color: black;
}
.main-wrapper {
  margin-top: 75px;
}
@media (max-width: 800px) {
  .header-container {
    display: none;
  }
  .main-wrapper {
    margin-top: 0;
  }
}
</style>
