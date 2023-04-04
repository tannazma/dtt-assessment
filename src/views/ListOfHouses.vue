<script setup lang="ts">
import CreateNew from '@/components/CreateNew.vue'
import Header from '@/components/Header.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { reactive } from 'vue'
import type { T_House } from '@/types/house'

const state = reactive<{
  searchText: string
  houses: T_House[]
}>({ searchText: '', houses: [] })

// this is old way
// response.then((responseResolved) => {
//   responseResolved.text().then((responseExtracted) => {
//     const result = JSON.parse(responseExtracted);
//     state.houses = result;
//   })
// })

// this is new good way
async function getHousesFromServer() {
  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    }
  })

  state.houses = await (await response).json()
}

getHousesFromServer()
</script>

<template>
  <Header />
  <div class="first-part">
    <h1 class="title">Houses</h1>
    <CreateNew />
  </div>
  <div class="second-part">
    <input
      :value="state.searchText"
      @input="event => state.searchText = (event.target as HTMLInputElement)?.value"
      class="input"
      placeholder="Search for a house"
    />
    <button class="price">Price</button>
    <button class="size">Size</button>
  </div>
  <div class="houses-parent">
    <HouseListItem
      v-for="house in state.houses.filter((h) =>
        h.description.toLowerCase().includes(state.searchText.toLowerCase())
      )"
      :key="house.id"
      :house="house"
    />
  </div>
</template>

<style scoped>
.first-part {
  background-color: darkgray;
}
.house-parent {
  display: flex;
  flex-direction: column;
}

.first-part {
  display: flex;
  margin-top: 20px;
}

.title {
  flex: 1;
  align-content: space-between;
}

.second-part {
  display: flex;
  align-items: center;
  margin-top: 20px;
  background-color: darkgray;
}
.input {
  margin-right: auto;
}

.price {
  display: flex;
  gap: 10px;
}
.size {
  display: flex;
  gap: 10px;
}
</style>
