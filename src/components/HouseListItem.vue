<script setup lang="ts">

defineProps<{
  house: {
    id: number
    name: string
    address: string
    price: string
  }
}>()
</script>

<template>
  <div style="border: 1px solid black; margin: 20px; padding: 10px">
    <img
      display="flex,"
      flex="1,"
      align-content="space-between,"
      width="100"
      src="src/assets/img_placeholder_house@3x.png"
    />   
    <br /> 
    <strong>ID</strong>: {{ house.id }}
    <br />
    <strong>Name</strong>: {{ house.name }}
    <br />
    <string>Price</string>: {{ house.price }}
    <br />
    {{ house.address }}
  </div>
</template>
