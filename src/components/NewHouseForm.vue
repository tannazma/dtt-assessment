<template>
  <div>
    Street name
    <input
      placeholder="Enter the street name"
      :value="state.streetName"
      @input="event => state.streetName = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    House Number
    <input
      placeholder="Enter house number"
      :value="state.houseNumber"
      @input="event => state.houseNumber = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Addition (Optional)
    <input />
    Postal code
    <input
      placeholder="e.g. 1000 AA"
      :value="state.postalCode"
      @input="event => state.postalCode = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    City
    <input
      placeholder="e.g. Utreckt"
      :value="state.city"
      @input="event => state.city = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Upload picture (JPG or PNG)
    <input
      placeholder="+"
      type="file"
      :value="state.picture"
      @input="event => state.picture = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Price
    <input
      placeholder="e.g. €150.000"
      :value="state.price"
      @input="event => state.price = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Size
    <input
      placeholder="e.g. 60m2"
      :value="state.size"
      @input="event => state.size = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Garage
    <input
      placeholder="Select"
      type="number"
      :value="state.garage"
      @input="event => state.garage = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Bedrooms
    <input
      placeholder="Enter amount"
      :value="state.bedroom"
      @input="event => state.bedroom = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Bathrooms
    <input
      placeholder="Enter amount"
      :value="state.bathroom"
      @input="event => state.bathroom = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Construction date
    <input
      placeholder="e.ge 1990"
      :value="state.date"
      @input="event => state.date = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Description
    <input
      placeholder="Enter description"
      required
      :value="state.description"
      @input="event => state.description = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    <button @click="submitForm">POST</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  streetName: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  picture: '',
  price: '',
  size: '',
  garage: '',
  bedroom: '',
  bathroom: '',
  date: '',
  description: ''
})

function submitForm() {
  console.log(state)
  // fetch('dtt.com/house/create', {
  //   method: 'POST',
  //   body: state
  // })
}
</script>

<style scoped>
input {
  padding: 15px;
  display: block;
}
</style>
