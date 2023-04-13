<script setup lang="ts">
import CreateNew from '@/components/CreateNew.vue'
import Header from '@/components/Header.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { reactive } from 'vue'
import type { T_House } from '@/types/house'

const state = reactive<{
  searchText: string
  houses: T_House[]
  showDeleteDialog: boolean
  sortParameter: 'price' | 'size'
  houseToDeleteId: number | undefined
}>({
  searchText: '',
  houses: [],
  showDeleteDialog: false,
  sortParameter: 'price',
  houseToDeleteId: undefined
})

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

async function deleteHouse(houseId: number | undefined) {
  if (houseId === undefined) return

  await fetch('https://api.intern.d-tt.nl/api/houses/' + houseId, {
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    },
    method: 'delete'
  })
  //close the dialog
  state.showDeleteDialog = false
  getHousesFromServer()
}
</script>

<template>
  <Header />
  <div class="first-part">
    <h1 class="title">Houses</h1>
    <CreateNew />
  </div>
  <div class="second-part">
    <div style="background-color: rgb(193, 189, 189)">
      <input
        :value="state.searchText"
        @input="event => state.searchText = (event.target as HTMLInputElement)?.value"
        class="input"
        placeholder="Search for a house"
      />
    </div>
    <div style="display: flex">
      <button class="price" @click="state.sortParameter = 'price'">Price</button>
      <button class="size" @click="state.sortParameter = 'size'">Size</button>
    </div>
  </div>
  <div
    style="text-align: center"
    v-if="
      state.houses.filter((h) =>
        h.description.toLowerCase().includes(state.searchText.toLowerCase())
      ).length === 0
    "
  >
    <img
      src="/src/assets/img_empty_houses@3x.png"
      style="margin-right: 20px; width: 50%; margin: 50px 40px; text-align: center"
    />
    <p>No results found.</p>
    <p>Please try another keyword.</p>
  </div>
  <div class="houses-parent">
    <HouseListItem
      @deleteHouse="
        (houseId) => {
          state.showDeleteDialog = true
          state.houseToDeleteId = houseId
        }
      "
      v-for="house in state.houses
        .filter((h) => h.description.toLowerCase().includes(state.searchText.toLowerCase()))
        .sort((house1, house2) =>
          house1[state.sortParameter] > house2[state.sortParameter] ? -1 : 1
        )"
      :key="house.id"
      :house="house"
    />
  </div>
  <div
    v-if="state.showDeleteDialog"
    style="
      position: fixed;
      display: grid;
      place-items: center;
      color: black;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      padding: 10%;
      background-color: rgba(0, 0, 0, 0.4);
    "
  >
    <div style="background-color: white; padding: 43px 96px; border-radius: 3%">
      <h2 style="text-align: center; margin-bottom: 20px">Delete listing</h2>
      <p style="align-content: center; color: gray">
        Are you sure you want to delete this listing?
      </p>
      <p style="text-align: center; margin-bottom: 45px; color: gray">
        This action can not be undone.
      </p>
      <div
        style="
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          gap: 20px;
          align-items: center;
        "
      >
        <button
          style="width: 200px; padding: 10px; border-radius: 8px; border: 1px"
          @click="deleteHouse(state.houseToDeleteId)"
        >
          YES, DELETE
        </button>
        <!-- close the dialog when we press Go back -->
        <button
          style="width: 200px; padding: 10px; border-radius: 8px; border: 1px"
          @click="state.showDeleteDialog = false"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  margin-bottom: 20px;
  justify-content: space-between;
}
.input {
  margin-right: auto;
  width: 250px;
  height: 30px;
  border-radius: 5%;
  border: none;
  padding-left: 45px;
  background: transparent;
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
