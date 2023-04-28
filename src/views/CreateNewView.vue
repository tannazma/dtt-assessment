<script setup lang="ts">
import NewHouseForm from '@/components/NewHouseForm.vue'
import type { T_House } from '@/types/house'
import { reactive } from 'vue'

const state = reactive<{
  house?: T_House
}>({ house: undefined })
</script>

<template>
  <div style="background-image: url(src/assets/img_background@3x.png); background-size: 100%">
    <div style="padding: 30px 0 20px 0">
      <RouterLink :to="'/list/'">
        <p style="color: black">
          <img src="src/assets/ic_back_grey@3x.png" width="15" style="text-align: center" alt="black gray icon"/>
          <label > Back to overview </label>
        </p>
      </RouterLink>
    </div>
    <div class="create-new">
      <h1>Create new listing</h1>
      <NewHouseForm :isEditing="false" :house="state.house" :editPage="false" />
    </div>
  </div>
</template>
