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
    <div style="background-color: white; border-radius: 5px; margin: auto; gap: 30px">
      <div
        style="margin-bottom: 10px; padding: 10px; display: flex; justify-content: space-between"
      >
        <div style="display: flex">
          <img width="130" height="130" :src="house.image" class="house-image" alt="house image" />
          <div style="display: flex; flex-direction: column">
            <strong class="house-street">{{ house.location.street }} </strong>
            <strong class="house-price">€ {{ house.price }}</strong>
            <p class="house-zip">{{ house.location.zip }} {{ house.location.city }}</p>
            <div class="icons">
              <p style="margin-right: 15px; display: flex; align-items: center; color: gray">
                <img
                  width="20"
                  src="/src/assets/ic_bed@3x.png"
                  style="margin-right: 8px"
                  alt="bedroom icon"
                />
                {{ house.rooms.bedrooms }}
              </p>
              <p style="margin-right: 15px; display: flex; align-items: center; color: gray">
                <img
                  width="20"
                  src="/src/assets/ic_bath@3x.png"
                  style="margin-right: 8px"
                  alt="bathroom icon"
                />{{ house.rooms.bathrooms }}
              </p>
              <p style="display: flex; align-items: center; color: gray">
                <img
                  width="20"
                  src="/src/assets/ic_size@3x.png"
                  style="margin-right: 8px"
                  alt="size icon"
                />
                {{ house.size }}m2
              </p>
            </div>
          </div>
        </div>
        <div v-if="showDelete">
          <EditHouseVue :house="house" v-if="showEdit" />
          <img
            @click="
              ($event) => {
                $event.preventDefault()
                $emit('deleteHouse', house.id)
              }
            "
            width="15"
            src="/src/assets/ic_delete@3x.png"
            style="margin-right: 8px; color: rgba(0, 0, 0, 0.5)"
            alt="delete icon"
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
.house-street {
  color: black;
  margin-bottom: 10px;
}
.house-zip {
  margin: 0 0 10px;
  color: gray;
}
.house-price {
  color: black;
  margin-bottom: 10px;
}
.icons {
  display: flex;
  gap: 2px;
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
}
</style>
