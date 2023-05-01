<script setup lang="ts">
import CreateNew from '@/components/CreateNew.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { computed, reactive } from 'vue'
import type { T_House } from '@/types/house'

const state = reactive<{
  searchText: string
  houses: T_House[]
  isDeleteDialogOpen: boolean
  sortParameter: 'price' | 'size'
  houseToDeleteId: number | undefined
}>({
  searchText: '',
  houses: [],
  isDeleteDialogOpen: false,
  sortParameter: 'price',
  houseToDeleteId: undefined
})

const filteredHouses = computed(() =>
  state.houses.filter(
    (h) =>
      h.description.toLowerCase().includes(state.searchText.toLowerCase()) ||
      h.location.street.toLowerCase().includes(state.searchText.toLowerCase()) ||
      h.location.city.toLowerCase().includes(state.searchText.toLowerCase()) ||
      h.location.zip.toLowerCase().includes(state.searchText.toLowerCase())
  )
)

function hideDeleteDialog() {
  state.isDeleteDialogOpen = false
}

function showDeleteDialog() {
  state.isDeleteDialogOpen = true
}

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
  hideDeleteDialog()
  getHousesFromServer()
}
</script>

<template>
  <div class="first-part">
    <h1 class="title">Houses</h1>
    <CreateNew />
  </div>
  <div class="second-part">
    <div>
      <div
        style="
          display: flex;
          background-color: #e8e8e8;
          padding: 5px 20px;
          border-radius: 5px;
          margin-left: 10px;
          align-items: center;
        "
      >
        <img src="/src/assets/ic_search@3x.png" width="20" height="20" />
        <input
          :value="state.searchText"
          @input="event => state.searchText = (event.target as HTMLInputElement)?.value"
          class="input"
          style="background-color: transparent; border-radius: 3px; border: none; outline: none"
          placeholder="Search for a house"
        />
        <img
          @click="state.searchText = ''"
          src="/src/assets/ic_clear@3x.png"
          width="20"
          height="20"
          style="box-sizing: content-box; cursor: pointer"
        />
      </div>
      <div>
        <strong style="padding: 20px">{{ filteredHouses.length }} results found</strong>
      </div>
    </div>
    <div style="display: flex">
      <button class="price primary" @click="state.sortParameter = 'price'">Price</button>
      <button class="size tertiary" @click="state.sortParameter = 'size'">Size</button>
    </div>
  </div>
  <div style="text-align: center" v-if="filteredHouses.length === 0">
    <img
      src="/src/assets/img_empty_houses@3x.png"
      style="margin-right: 20px; width: 50%; margin: 50px 40px; text-align: center"
      alt="empty house image"
    />
    <p>No results found.</p>
    <p>Please try another keyword.</p>
  </div>
  <div class="houses-parent">
    <HouseListItem
      @deleteHouse="
        (houseId) => {
          showDeleteDialog()
          state.houseToDeleteId = houseId
        }
      "
      v-for="house in filteredHouses.sort((house1, house2) =>
        house1[state.sortParameter] > house2[state.sortParameter] ? -1 : 1
      )"
      :key="house.id"
      :house="house"
      :showEdit="true"
      :showDelete="true"
    />
  </div>
  <div
    v-if="state.isDeleteDialogOpen"
    style="
      position: fixed;
      display: grid;
      place-items: center;
      color: black;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      padding: 10%;
      background-color: rgba(0, 0, 0, 0.4);
    "
  >
    <div style="background-color: white; padding: 43px 96px; border-radius: 5px">
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
          class="primary"
        >
          YES, DELETE
        </button>
        <!-- close the dialog when we press Go back -->
        <button
          style="width: 200px; padding: 10px; border-radius: 8px; border: 1px"
          @click="hideDeleteDialog"
          class="secondary"
        >
          GO BACK
        </button>
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

@media (max-width: 800px) {
  .title {
    text-align: center;
  }
}

.second-part {
  display: flex;
  align-items: center;
  margin: 20px 0 20px;
  justify-content: space-between;
}
.input {
  margin-right: auto;
  width: 250px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding-left: 45px;
  background: transparent;
}

.price {
  display: flex;
  gap: 10px;
  border-radius: 5px 0 0 5px;
}
.size {
  display: flex;
  gap: 10px;
  border-radius: 0 5px 5px 0;
}
</style>
