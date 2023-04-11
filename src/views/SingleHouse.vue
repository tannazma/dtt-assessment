<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import { reactive } from 'vue'
import type { T_House } from '@/types/house'

const route = useRoute()

const state = reactive<{
  house: T_House | undefined
}>({ house: undefined })

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
  <Header />
  <div>
    This is the house you were looking for house {{ route.params.id }}
    <img
      width="130"
      height="130"
      :src="state.house?.image"
      style="margin-right: 20px; border-radius: 5%"
    />
    {{ state.house?.description }}
    {{ state.house?.price }}
  </div>
</template>
