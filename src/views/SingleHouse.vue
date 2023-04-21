<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import type { T_House } from '@/types/house'
import HouseListItem from '@/components/HouseListItem.vue'

const route = useRoute()
const router = useRouter()

const state = reactive<{
  house: T_House | undefined
  houses: T_House[]
  isDeleteDialogOpen: boolean
}>({
  house: undefined,
  isDeleteDialogOpen: false,
  houses: []
})

watch(
  () => route.params.id,
  () => {
    getHouseFromServer()
  }
)

async function getHouseFromServer() {
  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    }
  })

  const houses: T_House[] = await (await response).json()
  state.house = houses.find((house) => house.id === Number(route.params.id))
  state.houses = houses
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
  <div style="padding: 30px 0 20px 0">
    <RouterLink :to="'/list/'">
      <p style="color: black">
        <img
          src="/src/assets/ic_back_grey@3x.png"
          width="15"
          style="text-align: center"
          alt="black gray icon"
        />
        <label> Back to overview </label>
      </p>
    </RouterLink>
  </div>
  <div style="background-color: white; margin-top: 20px; display: flex">
    <div style="">
      <img class="image" :src="state.house?.image" style="margin: 0 20px 0 0" alt="house image" />
      <div style="display: flex; justify-content: end">
        <div style="display: flex">
          <RouterLink :to="'/edit/' + state.house?.id">
            <img
              width="15"
              src="/src/assets/ic_edit@3x.png"
              style="margin-right: 20px"
              alt="edit icon"
            />
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
            height="20"
            src="/src/assets/ic_delete@3x.png"
            style="margin-right: 8px; display: flex; color: rgba(0, 0, 0, 0.5)"
            alt="delete icon"
          />
        </div>
      </div>
      <div style="margin-bottom: 20px; padding: 0 20px">
        <h1 style="margin-bottom: 20px">
          {{ state.house?.location.street }}
        </h1>
        <p style="margin-bottom: 10px">
          <img width="15" src="/src/assets/ic_location@3x.png" alt="location icon" />
          {{ state.house?.location.zip }} {{ state.house?.location.city }}
        </p>
        <div style="display: flex; gap: 15px">
          <p style="margin-bottom: 10px">
            <img width="15" src="/src/assets/ic_price@3x.png" alt="price icon" />
            {{ state.house?.price }}
          </p>
          <p>
            <img width="15" src="/src/assets/ic_size@3x.png" alt="size icon" />
            {{ state.house?.size }} m2
          </p>
          <p>
            <img
              width="15"
              src="/src/assets/ic_construction_date@3x.png"
              alt="contruction year icon"
            />
            Built in
            {{ state.house?.constructionYear }}
          </p>
        </div>
        <div style="display: flex; gap: 15px">
          <p>
            <img width="15" src="/src/assets/ic_bed@3x.png" alt="bedroom icon" />
            {{ state.house?.rooms.bedrooms }}
          </p>
          <p>
            <img width="15" src="/src/assets/ic_bath@3x.png" alt="bathroom icon" />
            {{ state.house?.rooms.bathrooms }}
          </p>
          <p>
            <img width="15" src="/src/assets/ic_garage@3x.png" alt="garage icon" />
            {{ state.house?.hasGarage }}
          </p>
        </div>
        <p style="margin-top: 20px">
          {{ state.house?.description }}
        </p>
      </div>
    </div>
    <div style="padding: 0 10px 0 40px; background-color: rgb(231, 231, 231); gap: 20px">
      <h3 style="padding-bottom: 10px">Recommended for you</h3>
      <RouterLink
        v-for="recommendHouse in state.houses.slice(0, 3)"
        :to="'/house/' + recommendHouse.id"
      >
        <HouseListItem
          :house="recommendHouse"
          :key="recommendHouse.id"
          :showEdit="false"
          :showDelete="false"
        />
      </RouterLink>
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
  </div>
</template>

<style>
.image {
  width: 100%;
}
</style>
