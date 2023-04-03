<script setup lang="ts">
import Header from '@/components/Header.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import CreateNewVue from '@/components/CreateNew.vue'
import { houses } from '@/stores/houses'
import { reactive } from 'vue'

const state = reactive({ searchText: '' })
</script>

<template>
  <Header />
  <div class="first-part">
    <h1 class="title">Houses</h1>
    <div>
      <CreateNewVue />
    </div>
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
      v-for="house in houses.filter((h) =>
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
