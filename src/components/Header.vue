<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header-container">
      <img width="100" src="/src/assets/img_logo_dtt@3x.png" alt="dtt logo"/>
      <RouterLink class="list" to="/list">Houses</RouterLink>
      <RouterLink class="about" to="/about">About</RouterLink>
  </div>
</template>

<style>
.header-container {
  padding: 20px 20px 20px 12rem;
  display: flex;
  background-color: white;
}

.list {
  align-content: space-between;
  margin:0 50px;
  color: black;
}
.about {
  color: black;
}
</style>
