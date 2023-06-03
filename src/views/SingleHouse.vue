<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import type { T_House } from '@/types/house'
import HouseListItem from '@/components/HouseListItem.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import { getHouseFromServerForSingle } from '@/stores/Api-call'
import { deleteHouseForSingle } from '@/stores/Api-call'

const route = useRoute()
const router = useRouter()

const state = reactive<{
  house: T_House | undefined
  houses: T_House[]
  isDeleteDialogOpen: boolean
  recommendedHouses: T_House[]
}>({
  house: undefined,
  isDeleteDialogOpen: false,
  houses: [],
  recommendedHouses: []
})

watch(
  () => route.params.id,
  () => {
    getHouseFromServer()
  }
)

async function getHouseFromServer() {
  getHouseFromServerForSingle()

  const houses: T_House[] = await getHouseFromServerForSingle()
  state.house = houses.find((house) => house.id === Number(route.params.id))
  state.houses = houses
  state.recommendedHouses = state.houses
    .filter((b) => b.location.city === state.house?.location.city)
    .slice(0, 3)
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

  await deleteHouseForSingle(houseId)
  hideDeleteDialog()
  router.push('/list')
}
</script>

<template>
  <div class="back-page">
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
  <div class="house-container">
    <div>
      <div>
        <img class="image" :src="state.house?.image" alt="house image" />
        <div class="back-mobile">
          <RouterLink :to="'/list/'">
            <img class="back-mobile" src="/src/assets/ic_back_white@3x.png" alt="black gray icon" />
          </RouterLink>
        </div>
        <div class="edit-mobile">
          <RouterLink :to="'/edit/' + state.house?.id">
            <img src="/src/assets/ic_edit_white@3x.png" alt="edit icon" class="edit-mobile" />
          </RouterLink>
        </div>
        <div class="delete-mobile">
          <img
            @click="
              ($event) => {
                $event.preventDefault()
                showDeleteDialog()
              }
            "
            src="/src/assets/ic_delete_white@3x.png"
            alt="delete icon"
            class="delete-mobile"
          />
        </div>
      </div>
      <div class="house-box">
        <div class="house-title">
          <div class="house-title-div">
            <h1 class="house-location">
              {{ state.house?.location.street }}
            </h1>
          </div>
          <div class="edit-delete" v-if="state.house?.madeByMe">
            <div class="edit-route">
              <RouterLink :to="'/edit/' + state.house?.id">
                <img
                  width="15"
                  src="/src/assets/ic_edit@3x.png"
                  alt="edit icon"
                  class="edit-desktop"
                />
              </RouterLink>
            </div>
            <div class="delete-icon">
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
                alt="delete icon"
                class="delete-desktop"
              />
            </div>
          </div>
        </div>
        <p class="location-p">
          <img width="15" src="/src/assets/ic_location@3x.png" alt="location icon" />
          {{ state.house?.location.zip }} {{ state.house?.location.city }}
        </p>
        <div class="house-price-div">
          <p class="house-price">
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
        <div class="house-rooms">
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
            {{ state.house?.hasGarage ? 'Yes' : 'No' }}
          </p>
        </div>
        <p class="house-description">
          {{ state.house?.description }}
        </p>
      </div>
    </div>
    <div class="recommended-column">
      <h3 class="h3">Recommended for you</h3>
      <RouterLink
        v-for="recommendHouse in state.recommendedHouses"
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
    <DeleteDialog
      v-if="state.isDeleteDialogOpen"
      @delete="deleteHouse(state.house?.id)"
      @close="hideDeleteDialog"
    />
  </div>
</template>

<style scoped>
.image {
  width: 100%;
}
.house-box {
  margin-bottom: 20px;  
  padding: 0 24px;
}
.house-title {
  display: flex;
}
.house-title-div {
  flex: 1;
}
.house-location {
  margin-bottom: 20px;
}
.edit-route {
  display: flex;
}
.delete-icon {
  display: flex;
}
.house-price-div {
  display: flex;
  gap: 15px;
}
.house-rooms {
  display: flex;
  gap: 15px;
}
.house-description {
  margin-top: 20px;
}
.recommended-column {
  padding: 0 10px 0 40px;
  background-color: #f6f6f6;
  gap: 10px;
}
.edit-delete {
  margin-top: 10px;
  display: flex;
}
.edit-desktop {
  margin-right: 20px;
}
.house-price {
  margin-bottom: 10px;
}
.h3 {
  padding-bottom: 10px;
}
.delete-desktop {
  margin-right: 8px;
  display: flex;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.back-mobile {
  display: none;
  width: 20px;
}
.edit-mobile {
  display: none;
}
.delete-mobile {
  display: none;
  display: flex;
}
.back-page {
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
.house-container {
  background-color: white;
  margin-top: 0;
  display: flex;
}
.location-p {
  margin-bottom: 10px;
}
@media (max-width: 800px) {
  .house-container {
    flex-direction: column;
    margin-top: 0;
  }
  .back-page {
    display: none;
  }
  .house-box {
    border-radius: 30px;
    margin-top: -40px;
    background-color: white;
  }
  .house-title {
    padding-top: 15px;
  }
  .h3 {
    padding-top: 15px;
  }
  .recommended-column {
    padding-left: 20px;
    padding-right: 20px;
  }
  .delete-desktop {
    display: none;
  }
  .edit-desktop {
    display: none;
  }
  .back-mobile {
    display: inline;
    position: absolute;
    top: 25px;
    left: 20px;
  }
  .edit-mobile {
    display: inline;
    position: absolute;
    top: 22px;
    right: 26px;
    width: 21px;
  }
  .delete-mobile {
    display: inline;
    position: absolute;
    top: 22px;
    right: 18px;
    width: 16px;
  }
  .image {
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>
