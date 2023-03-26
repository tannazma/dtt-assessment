<script setup lang="ts">
import { houses } from '@/stores/houses'
</script>

<template>
  <div>
    <div v-for="House in houses" :key="House.id" style="border: 1px solid black; margin: 20px; padding: 10px;">
      <strong>ID</strong>: {{ House.id }}
      <br />
      <strong>Address</strong>: {{ House.name }}
      <br />
      {{ House.descrption }}
    </div>
  </div>
</template>
