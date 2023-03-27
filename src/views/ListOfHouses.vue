<script setup lang="ts">
import Header from '@/components/Header.vue'
import { houses } from '@/stores/houses'
</script>

<template>
  <div>
    <Header />
    <h1>Houses</h1>
    <button>+ CREATE NEW</button>
  </div>
  <div>
    <input placeholder="Search for a house" />
    <button>Price</button>
    <button>Size</button>
  </div>
  <div
    v-for="House in houses"
    :key="House.id"
    style="border: 1px solid black; margin: 20px; padding: 10px"
  >
    <strong>ID</strong>: {{ House.id }}
    <br />
    <strong>Address</strong>: {{ House.name }}
    <br />
    {{ House.descrption }}
  </div>
</template>
