<script setup lang="ts">
import CreateNew from '@/components/CreateNew.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { computed, reactive } from 'vue'
import type { T_House } from '@/types/house'
import DeleteDialog from '@/components/DeleteDialog.vue'

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
      <div class="first-child-input">
        <img src="/src/assets/ic_search@3x.png" width="20" height="20" />
        <input
          :value="state.searchText"
          @input="event => state.searchText = (event.target as HTMLInputElement)?.value"
          class="input"
          style="background-color: transparent; border-radius: 3px; border: none; outline: none"
          placeholder="Search for a house"
        />
        <img
          v-if="state.searchText"
          @click="state.searchText = ''"
          src="/src/assets/ic_clear@3x.png"
          width="20"
          height="20"
          style="box-sizing: content-box; cursor: pointer"
        />
      </div>
    </div>
    <div class="button-container" style="display: flex">
      <button
        class="price tertiary"
        :class="{ 'primary': state.sortParameter === 'price' }"
        @click="state.sortParameter = 'price'"
      >
        Price
      </button>
      <button
        :class="{ 'primary': state.sortParameter === 'size' }"
        class="size tertiary"
        @click="state.sortParameter = 'size'"
      >
        Size
      </button>
    </div>
  </div>
  <div class="results">
    <strong>{{ filteredHouses.length }} results found</strong>
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
  <DeleteDialog
    v-if="state.isDeleteDialogOpen"
    @delete="deleteHouse(state.houseToDeleteId)"
    @close="hideDeleteDialog"
  />
</template>

<style scoped>
.house-parent {
  display: flex;
  flex-direction: column;
}

.first-part {
  display: flex;
  margin-top: 20px;
  padding-top: 20px;
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
  align-items: flex-start;
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
  color: white;
  cursor: pointer;
}
.size {
  display: flex;
  gap: 10px;
  border-radius: 0 5px 5px 0;
  color: white;
  cursor: pointer;
}

.first-child-input {
  display: flex;
  background-color: rgb(232, 232, 232);
  padding: 5px 20px;
  border-radius: 5px;
  align-items: center;
}
.results {
  padding-bottom: 20px;
}

@media (max-width: 800px) {
  .price {
    flex-direction: column;
    flex: 1;
  }
  .size {
    flex-direction: column;
    flex: 1;
  }
  .button-container {
    text-align: center;
    padding-bottom: 15px;
  }
  .first-part {
    margin-top: 0;
  }
  .second-part {
    display: block;
  }
  .first-child-input {
    margin-bottom: 20px;
    margin-left: 0;
  }
  .houses-parent {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
}
</style>
