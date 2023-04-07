<script setup lang="ts">
import type { T_House } from '@/types/house'

defineProps<{
  house: T_House
}>()
</script>

<template>
  <RouterLink :to="'/house/' + house.id">
    <div style="background-color:white; border-radius:3%;margin: auto; gap: 30px;">
    <div style="margin-bottom: 10px; padding: 10px; display: flex">
      <img width="130" height="130" :src="house.image" style="margin-right: 20px; border-radius: 5%;" />
      <div style="display: flex; flex-direction: column">
        <strong style="color:black">{{ house.location.street }}</strong>
        <strong style="color:black">€ {{ house.price }}</strong>
        <p style="margin-top: 0px; color: gray">
          {{ house.location.zip }} {{ house.location.city }}
        </p>
        <div style="display: flex; margin-top: 20px">
          <p style="margin-right: 20px; display: flex; align-items: center; color: gray;">
            <img width="20" src="src/assets/ic_bed@3x.png" style="margin-right: 8px" />
            {{ house.rooms.bedrooms }}
          </p>
          <p style="margin-right: 20px; display: flex; align-items: center; color: gray;">
            <img width="20" src="src/assets/ic_bath@3x.png" style="margin-right: 8px" />{{
              house.rooms.bathrooms
            }}
          </p>
          <p style="display: flex; align-items: center; color: gray">
            <img width="20" src="src/assets/ic_size@3x.png" style="margin-right: 8px" />
            {{ house.size }} m2
          </p>
        </div>
      </div>
      <!-- {{ house.description }} -->
    </div>
  </div>
  </RouterLink>
</template>
