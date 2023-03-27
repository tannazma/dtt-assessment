<script setup lang="ts">
defineProps<{
  house: {
    id: number
    name: string
    descrption: string
  }
}>()
</script>

<template>
  <div style="border: 1px solid black; margin: 20px; padding: 10px">
    <strong>ID</strong>: {{ house.id }}
    <br />
    <strong>Address</strong>: {{ house.name }}
    <br />
    {{ house.descrption }}
  </div>
</template>
