<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header-container">
    <img
      display="flex,"
      flex="1,"
      align-content="space-between,"
      width="100"
      src="src/assets/img_logo_dtt@3x.png"
    />
    <RouterLink class="list" to="/list">Houses</RouterLink>
    <RouterLink class="about" to="/about">About</RouterLink>
  </div>
</template>

<style>
.header-container {
  display: flex;
}

.list {
  align-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
  color: black;
}
.about {
  color: black;
}
</style>
