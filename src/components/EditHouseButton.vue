<template>
  <RouterLink :to="'/edit/' + house.id">
    <img width="15" src="/src/assets/ic_edit@3x.png" alt="edit icon" />
  </RouterLink>
</template>

<script setup lang="ts">
import type { T_House } from '@/types/house'
import { RouterLink } from 'vue-router'

defineProps<{
  house: T_House
}>()
</script>
