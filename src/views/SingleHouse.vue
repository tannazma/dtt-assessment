<script setup lang="ts">
import { houses } from '@/stores/houses'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'

const route = useRoute()
const house = houses.find((house) => house.id === Number(route.params.id))
</script>

<template>
  <Header />
  <div>
    This is the house you were looking for house {{ route.params.id }}
    {{ house?.description }}
    {{ house?.price }}
  </div>
</template>
