<script setup lang="ts">
import NewHouseForm from '@/components/NewHouseForm.vue'
import type { T_House } from '@/types/house'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/globalStore'

const state = reactive<{
  house: T_House | undefined
}>({ house: undefined })

const route = useRoute()

const globalState = useGlobalStore()

async function getHouseFromStore() {
  await globalState.getHousesFromServer()
  state.house = globalState.getHouseById(Number(route.params.id))
}
getHouseFromStore()
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
