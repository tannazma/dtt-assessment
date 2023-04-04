<script setup lang="ts">
import type { T_House } from '@/types/house';

defineProps<{
  house: T_House
}>()
</script>

<template>
  <RouterLink :to="'/house/' + house.id">
    <div style="border: 1px solid black; margin: 20px; padding: 10px">
      <img width="100" :src="house.image" />
      <br />
      <strong>ID</strong>: {{ house.id }}
      <br />
      <img width="30" src="src/assets/ic_bath@3x.png" />
      <p>bedrooms:{{ house.rooms.bedrooms }}</p>
      <strong>Price</strong>: {{ house.price }}
      <br />
      {{ house.description }}
    </div>
  </RouterLink>
</template>
