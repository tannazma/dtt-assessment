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
      :value="state.zip"
      @input="event => state.zip = (event.target as HTMLInputElement)?.value"
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
      :value="state.hasGarage"
      @input="event => state.hasGarage = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Bedrooms
    <input
      placeholder="Enter amount"
      :value="state.bedrooms"
      @input="event => state.bedrooms = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Bathrooms
    <input
      placeholder="Enter amount"
      :value="state.bathrooms"
      @input="event => state.bathrooms = (event.target as HTMLInputElement)?.value"
      class="input"
    />
    Construction date
    <input
      placeholder="e.ge 1990"
      :value="state.constructionYear"
      @input="event => state.constructionYear = (event.target as HTMLInputElement)?.value"
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
    <button @click="submitForm" type="submit" :disabled="!isDecriptionValid()">POST</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  price: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  constructionYear: '',
  hasGarage: '',
  picture: '',
  description: ''
})

// it is here for referece comparison

state.price = '210'
state.bedrooms = '1'
state.bathrooms = '1'
state.size = '1'
state.streetName = 'Overtoom'
// state.houseNumber = '21'
// state.numberAddition = '1'
// state.zip = '11867787686781TY'
// state.city = 'Amsterdam'
// state.constructionYear = '1968'
// state.hasGarage = 'false'
// description: 'Nice houseeeeeeeee!'

async function submitForm() {
  var form_data = new FormData()

  for (var key in state) {
    form_data.append(key, state[key as keyof typeof state])
  }
  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    },
    body: form_data
  })

  try {
    console.log(await (await response).json())
  } catch {
    alert('Error happened')
  }
}
function isDecriptionValid() {
  if (state.description) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped>
input {
  padding: 15px;
  display: block;
}
</style>
