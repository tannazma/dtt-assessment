<script setup lang="ts">
import NewHouseForm from '@/components/NewHouseForm.vue'
import type { T_House } from '@/types/house'
import { reactive } from 'vue'

const state = reactive<{
  house?: T_House
}>({ house: undefined })
</script>

<template>
  <div class="background-image">
    <div class="back-container">
      <RouterLink :to="'/list/'">
        <p class="list-route">
          <img
            src="src/assets/ic_back_grey@3x.png"
            width="15"
            class="back-gray-icon"
            alt="black gray icon"
          />
          <label class="back-overview"> Back to overview </label>
        </p>
      </RouterLink>
    </div>
    <div class="create-new">
      <h1>Create new listing</h1>
      <NewHouseForm :isEditing="false" :house="state.house" :editPage="false" />
    </div>
  </div>
</template>

<style>
.background-image {
  background-image: url(src/assets/img_background@3x.png);
  background-size: cover;
}
.back-container {
  padding: 30px 0 20px 0;
}
.list-route {
  color: black;
}
.back-gray-icon {
  text-align: center;
}
.back-overview {
  cursor: pointer;
}
</style>
