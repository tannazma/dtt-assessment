<script setup lang="ts">
import Header from '@/components/Header.vue'
import NewHouseForm from '@/components/NewHouseForm.vue'
import type { T_House } from '@/types/house'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const state = reactive<{
  house: T_House | undefined
}>({ house: undefined })

const route = useRoute()

async function getHouseFromServer() {
  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    }
  })

  const houses: T_House[] = await (await response).json()
  state.house = houses.find((house) => house.id === Number(route.params.id))
}
getHouseFromServer()
</script>

<template>
  <div style="background-image: url(src/assets/img_background@3x.png); background-size: 100%;">
    <Header />
    <div>
      <p>Back to overview</p>
    </div>
    <div class="create-new">
      <h1>Edit listing</h1>
      <NewHouseForm v-if="state.house" :isEditing="true" :house="state.house" />
    </div>
  </div>
</template>
