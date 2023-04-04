<script setup lang="ts">
import Header from '@/components/Header.vue';
import NewHouseForm from '@/components/NewHouseForm.vue'
</script>

<template>
    <Header />
  <div>
    <p>
      Back to overview
    </p>
  </div>
  <div class="create-new">
    <h1>Create new listing</h1>
    <NewHouseForm />
  </div>
</template>
