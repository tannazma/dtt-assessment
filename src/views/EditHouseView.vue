<script setup lang="ts">
import NewHouseForm from '@/components/NewHouseForm.vue'
import type { T_House } from '@/types/house'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { apiKey } from '@/stores/Api-key'

const state = reactive<{
  house: T_House | undefined
}>({ house: undefined })

const route = useRoute()

async function getHouseFromServer() {

  const headers = {
    'X-Api-Key': apiKey,
  };

  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    headers: headers
  })

  const houses: T_House[] = await (await response).json()
  state.house = houses.find((house) => house.id === Number(route.params.id))
}
getHouseFromServer()
</script>

<template>
  <div class="background-image">
    <div class="back-container">
      <RouterLink :to="'/list/'">
        <p class="list-route">
          <img
            src="/src/assets/ic_back_grey@3x.png"
            width="15"
            class="back-gray-icon"
            alt="black gray icon"
          />
          <label class="back-overview"> Back to overview </label>
        </p>
      </RouterLink>
    </div>
    <div class="create-new">
      <h1>Edit listing</h1>
      <NewHouseForm v-if="state.house" :isEditing="true" :house="state.house" :editPage="true" />
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url(/src/assets/img_background@3x.png);
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
