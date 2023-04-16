<script setup lang="ts">
import Header from '@/components/Header.vue'
import NewHouseForm from '@/components/NewHouseForm.vue'
</script>

<template>
  <div style="background-image: url(src/assets/img_background@3x.png); background-size: 100%;">
    <Header />
    <div>
      <p>Back to overview</p>
    </div>
    <div class="create-new">
      <h1>Edit listing</h1>
      <NewHouseForm :isEditing="true" />
    </div>
    
  </div>
</template>
