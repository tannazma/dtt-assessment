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
          <img
            width="130"
            height="130"
            :src="house.image"
            style="margin-right: 20px; border-radius: 5px"
            alt="house image"
          />
          <div style="display: flex; flex-direction: column">
            <strong style="color: black; margin-bottom: 10px">{{ house.location.street }} </strong>
            <strong style="color: black; margin-bottom: 10px">€ {{ house.price }}</strong>
            <p style="margin: 0 0 10px; color: gray;">
              {{ house.location.zip }} {{ house.location.city }}
            </p>
            <div style="display: flex; gap:2px">
              <p style="margin-right: 20px; display: flex; align-items: center; color: gray">
                <img width="20" src="/src/assets/ic_bed@3x.png" style="margin-right: 8px" alt="bedroom icon"/>
                {{ house.rooms.bedrooms }}
              </p>
              <p style="margin-right: 20px; display: flex; align-items: center; color: gray">
                <img width="20" src="/src/assets/ic_bath@3x.png" style="margin-right: 8px" alt="bathroom icon"/>{{
                  house.rooms.bathrooms
                }}
              </p>
              <p style="display: flex; align-items: center; color: gray">
                <img width="20" src="/src/assets/ic_size@3x.png" style="margin-right: 8px" alt="size icon"/>
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
