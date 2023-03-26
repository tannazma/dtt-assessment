<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.id)
</script>

<template>
  <div>This is the house you were looking for house {{ route.params.id }}.</div>
</template>
