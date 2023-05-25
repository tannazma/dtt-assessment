<script setup lang="ts">
import type { T_House } from '@/types/house'
import EditHouseVue from './EditHouseButton.vue'

defineProps<{
  house: T_House
  showEdit: boolean
  showDelete: boolean
}>()
</script>

<template>
  <RouterLink :to="'/house/' + house.id">
    <div class="house-container">
      <div class="house-box">
        <img width="130" height="130" :src="house.image" class="house-image" alt="house image" />
        <div class="house-location">
          <strong class="house-street">{{ house.location.street }} </strong>
          <strong class="house-price">€ {{ house.price }}</strong>
          <p class="house-zip">{{ house.location.zip }} {{ house.location.city }}</p>
          <div class="icons">
            <p class="house-bedroom">
              <img
                width="20"
                src="/src/assets/ic_bed@3x.png"
                alt="bedroom icon"
              />
              {{ house.rooms.bedrooms }}
            </p>
            <p class="house-bathroom">
              <img
                width="20"
                src="/src/assets/ic_bath@3x.png"
                alt="bathroom icon"
              />{{ house.rooms.bathrooms }}
            </p>
            <p class="house-size">
              <img
                width="20"
                src="/src/assets/ic_size@3x.png"
                alt="size icon"
              />
              {{ house.size }}m2
            </p>
          </div>
        </div>
      </div>
      <div v-if="showDelete" class="delete-edit-container">
        <div class="edit-icon">
          <EditHouseVue :house="house" v-if="showEdit" />
        </div>
        <div>
          <img
            @click="
              ($event) => {
                $event.preventDefault()
                $emit('deleteHouse', house.id)
              }
            "
            width="15"
            src="/src/assets/ic_delete@3x.png"
            alt="delete icon"
            class="delete-icon"
          />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.house-image {
  margin-right: 20px;
  border-radius: 5px;
}
.house-container {
  background-color: white;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.house-box {
  display: flex;
}
.house-bedroom, .house-bathroom, .house-size {
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: gray;
}
.house-bedroom img, .house-bathroom img, .house-size img {
  margin-right: 8px;
}
.house-location {
  display: flex;
  flex-direction: column;
}
.delete-edit-container {
  display: flex;
}
.house-street, .house-price {
  color: black;
  margin-bottom: 10px;
}
.house-zip {
  margin: 0 0 10px;
  color: gray;
}

.icons {
  display: flex;
  gap: 2px;
}
.edit-icon {
  margin-right: 20px;
}
.delete-icon {
  margin-right: 8px;
}

@media (max-width: 800px) {
  .house-image {
    margin-right: 14px;
    width: 115px;
    height: 115px;
  }
  .house-street {
    margin-bottom: 4px;
  }
  .house-zip {
    margin: 0 0 4px;
  }
  .house-price {
    margin-bottom: 5px;
  }
  .icons {
    gap: 1px;
    margin-top: 9px;
  }
  .edit-icon {
    margin-right: 10px;
  }
}
</style>
