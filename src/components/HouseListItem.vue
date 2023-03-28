<script setup lang="ts">
defineProps<{
  house: {
    id: number
    image: string
    price: number
    rooms: { bedrooms: number; bathrooms: number }
    size: number
    description: string
    location: { street: string; city: string; zip: string }
    createdAt: string
    constructionYear: number
    hasGarage: boolean
    madeByMe: boolean
  }
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
