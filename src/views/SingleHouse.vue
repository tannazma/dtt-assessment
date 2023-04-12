<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import { reactive } from 'vue'
import type { T_House } from '@/types/house'
import EditHouseButton from '@/components/EditHouseButton.vue'

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
  <div>
    <Header />
    <div>
      <p style="margin-top: 20px">Back to overview</p>
    </div>
    <div style="background-color: white; margin-top: 20px">
      <div>
        <img class="image" :src="state.house?.image" style="margin-right: 20px; margin-top: 0px" />
      </div>
      <div style="padding: 20px; margin: 20px">
        <div style="margin-bottom: 20px">
          <h1 style="margin-bottom: 20px">
            {{ state.house?.location.street }}
          </h1>
          <p style="margin-bottom: 10px">
            <img width="15" src="/src/assets/ic_location@3x.png" />
            {{ state.house?.location.zip }} {{ state.house?.location.city }}
            <div style="display: flex; justify-content:space-between">
                <EditHouseButton style="display: flex"/>
              <img
              @click="
                ($event) => {
                  $event.preventDefault()
                  $emit('deleteHouse')
                }
              "
              width="15"
              src="/src/assets/ic_delete@3x.png"
              style="margin-right: 8px; display: flex; color: rgba(0, 0, 0, 0.5)"
            />
            </div>
          </p>
          <div style="display: flex; gap: 15px">
            <p style="margin-bottom: 10px">
              <img width="15" src="/src/assets/ic_price@3x.png" />
              {{ state.house?.price }}
            </p>
            <p><img width="15" src="/src/assets/ic_size@3x.png" /> {{ state.house?.size }} m2</p>
            <p>
              <img width="15" src="/src/assets/ic_construction_date@3x.png" /> Built in
              {{ state.house?.constructionYear }}
            </p>
          </div>
          <div style="display: flex; gap: 15px">
            <p>
              <img width="15" src="/src/assets/ic_bed@3x.png" />
              {{ state.house?.rooms.bedrooms }}
            </p>
            <p>
              <img width="15" src="/src/assets/ic_bath@3x.png" />
              {{ state.house?.rooms.bathrooms }}
            </p>
            <p>
              <img width="15" src="/src/assets/ic_garage@3x.png" />
              {{ state.house?.hasGarage }}
            </p>
          </div>
          <p style="margin-top: 20px">
            {{ state.house?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.image {
  width: 100%;
}
</style>
