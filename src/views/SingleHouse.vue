<script setup lang="ts">
import { houses } from '@/stores/houses'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.id)
</script>

<template>
  <div>
    This is the house you were looking for house {{ route.params.id }}
    {{ houses.find(house => house.id== Number(route.params.id)) ?.name }} 
  </div>
</template>
