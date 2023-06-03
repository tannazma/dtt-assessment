<script setup lang="ts">
import HouseListItem from '@/components/HouseListItem.vue'
import { computed, reactive } from 'vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import CreateNewButton from '@/components/CreateNewButton.vue'
import { deleteHouseInList } from '@/stores/Api-call'
import { useGlobalStore } from '@/stores/globalStore'

const state = reactive<{
  searchText: string
  isDeleteDialogOpen: boolean
  sortParameter: 'price' | 'size' | undefined
  houseToDeleteId: number | undefined
}>({
  searchText: '',
  isDeleteDialogOpen: false,
  sortParameter: 'price',
  houseToDeleteId: undefined
})

const globalState = useGlobalStore()

const filteredHouses = computed(() =>
  globalState.houses.filter(
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

function clickOnPriceButton() {
  if (state.sortParameter === 'price') state.sortParameter = undefined
  else state.sortParameter = 'price'
}
function clickOnSizeButton() {
  if (state.sortParameter === 'size') state.sortParameter = undefined
  else state.sortParameter = 'size'
}

globalState.getHousesFromServer()

async function deleteHouse(houseId: number | undefined) {
  if (houseId === undefined) return

  await deleteHouseInList(houseId)
  hideDeleteDialog()
  globalState.getHousesFromServer()
}
</script>

<template>
  <div class="first-part">
    <h1 class="title">Houses</h1>
    <CreateNewButton />
  </div>
  <div class="second-part">
    <div>
      <div class="first-child-input">
        <img src="/src/assets/ic_search@3x.png" width="20" height="20" />
        <input
          :value="state.searchText"
          @input="event => state.searchText = (event.target as HTMLInputElement)?.value"
          class="search-house"
          placeholder="Search for a house"
        />
        <img
          v-if="state.searchText"
          @click="state.searchText = ''"
          src="/src/assets/ic_clear@3x.png"
          width="20"
          height="20"
          class="clear-icon"
        />
      </div>
    </div>
    <div class="button-container">
      <button
        class="price tertiary"
        :class="{ primary: state.sortParameter === 'price' }"
        @click="clickOnPriceButton"
      >
        Price
      </button>
      <button
        :class="{ primary: state.sortParameter === 'size' }"
        class="size tertiary"
        @click="clickOnSizeButton"
      >
        Size
      </button>
    </div>
  </div>
  <div class="results">
    <strong>{{ filteredHouses.length }} results found</strong>
  </div>
  <div class="empty-house-div" v-if="filteredHouses.length === 0">
    <img
      src="/src/assets/img_empty_houses@3x.png"
      class="empty-house-image"
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
      v-for="house in filteredHouses.slice().sort((house1, house2) => {
        if (state.sortParameter === undefined) return 0
        return house1[state.sortParameter] > house2[state.sortParameter] ? -1 : 1
      })"
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
.first-part {
  display: flex;
  margin-top: 20px;
  padding-top: 20px;
}
.search-house {
  background-color: transparent;
  border-radius: 3px;
  border: none;
  outline: none;
}
.button-container {
  display: flex;
}
.clerar-icon {
  box-sizing: content-box;
  cursor: pointer;
}
.empty-house-div {
  text-align: center;
}
.empty-house-image {
  margin-right: 20px;
  width: 50%;
  margin: 50px 40px;
  text-align: center;
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
