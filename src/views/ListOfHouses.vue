<script setup lang="ts">
import Header from '@/components/Header.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { houses } from '@/stores/houses'
</script>

<template>
  <Header />
  <div>
    <h1>Houses</h1>
    <button>+ CREATE NEW</button>
  </div>
  <div>
    <input placeholder="Search for a house" />
    <button>Price</button>
    <button>Size</button>
  </div>
  <div class="houses-parent">
    <HouseListItem v-for="house in houses" :key="house.id" :house="house" />
  </div>
</template>

<style scoped>
.house-parent {
  display: flex;
  flex-direction: column;
}
</style>
