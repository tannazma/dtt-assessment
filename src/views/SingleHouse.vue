<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import type { T_House } from '@/types/house'

const route = useRoute()
const router = useRouter()

const state = reactive<{
  house: T_House | undefined
  isDeleteDialogOpen: boolean
}>({ 
  house: undefined, 
  isDeleteDialogOpen: false 
})

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

function hideDeleteDialog() {
  state.isDeleteDialogOpen = false
}

function showDeleteDialog() {
  state.isDeleteDialogOpen = true
}

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
  router.push('/list')
}
</script>

<template>
  <div style="padding-top: 30px; padding-bottom: 20px">
    <RouterLink :to="'/list/'">
      <p style="color: black">
        <img src="/src/assets/ic_back_grey@3x.png" width="15" style="text-align: center" />
        <label> Back to overview </label>
      </p>
    </RouterLink>
  </div>
  <div style="background-color: white; margin-top: 20px">
    <div>
      <img class="image" :src="state.house?.image" style="margin-right: 20px; margin-top: 0px" />
    </div>
    <div style="padding: 20px; margin: 20px">
      <div style="display: flex; justify-content: end">
        <div style="display: flex">
          <RouterLink :to="'/edit/' + state.house?.id">
            <img width="15" src="/src/assets/ic_edit@3x.png" style="margin-right: 20px" />
          </RouterLink>
        </div>
        <div style="display: flex">
          <img
            @click="
              ($event) => {
                $event.preventDefault()
                showDeleteDialog()
              }
            "
            width="15"
            src="/src/assets/ic_delete@3x.png"
            style="margin-right: 8px; display: flex; color: rgba(0, 0, 0, 0.5)"
          />
        </div>
      </div>
      <div style="margin-bottom: 20px">
        <h1 style="margin-bottom: 20px">
          {{ state.house?.location.street }}
        </h1>
        <p style="margin-bottom: 10px">
          <img width="15" src="/src/assets/ic_location@3x.png" />
          {{ state.house?.location.zip }} {{ state.house?.location.city }}
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
    <div
      v-if="state.isDeleteDialogOpen"
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
            @click="deleteHouse(state.house?.id)"
          >
            YES, DELETE
          </button>
          <!-- close the dialog when we press Go back -->
          <button
            style="width: 200px; padding: 10px; border-radius: 8px; border: 1px"
            @click="hideDeleteDialog"
          >
            GO BACK
          </button>
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
