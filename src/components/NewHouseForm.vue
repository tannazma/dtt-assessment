<template>
  <form>
    <div class="form-field">
      <label>
        Street name
        <input
          placeholder="Enter the street name"
          :value="state.streetName"
          @input="event => state.streetName = (event.target as HTMLInputElement)?.value"
        />
      </label>
      <span :style="{ color: 'red', display: isStreetValid() ? 'none' : 'block' }">
        Required field is missing</span
      >
    </div>
    <div style="display: flex; gap: 30px" class="form-field">
      <div style="display: flex; flex-direction: column">
        <label>
          House Number
          <input
            placeholder="Enter house number"
            :value="state.houseNumber"
            @input="event => state.houseNumber = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span :style="{ color: 'red', display: isHouseNumberValid() ? 'none' : 'block' }">
          Required field is missing</span
        >
      </div>
      <div style="display: flex; flex-direction: column">
        <label>
          Addition
          <input
            :value="state.numberAddition"
            @input="event => state.numberAddition = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span :style="{ color: 'blue', display: 'block' }"> This is optional</span>
      </div>
    </div>
    <div class="form-field">
      <label>
        Postal code
        <input
          placeholder="e.g. 1000 AA"
          :value="state.zip"
          @input="event => state.zip = (event.target as HTMLInputElement)?.value"
        />
      </label>
      <span :style="{ color: 'red', display: isPostalCodeValid() ? 'none' : 'block' }">
        Please enter a valid postal code</span
      >
    </div>
    <div class="form-field">
      <label>
        City
        <input
          placeholder="e.g. Utreckt"
          :value="state.city"
          @input="event => state.city = (event.target as HTMLInputElement)?.value"
        />
      </label>
      <span :style="{ color: 'red', display: isCityValid() ? 'none' : 'block' }">
        Please enter a valid city</span
      >
    </div>
    <div class="form-field">
      <label>
        Upload picture (JPG or PNG)
        <div style="font-size: 50px; margin-top: 10px">
          <div v-if="!state.picture" style="border: 3px dashed #c3c3c3; width: 78px; height: 84px">
            <img
              width="25"
              src="/src/assets/ic_plus_grey@3x.png"
              style="margin-left: 23px; margin-bottom: 8px"
            />
          </div>
        </div>
        <input
          style="display: none"
          onchange="document.getElementById('selected-image').src = window.URL.createObjectURL(this.files[0])"
          type="file"
          @input="event => state.picture = (event.target as HTMLInputElement)?.files?.[0]"
        />
      </label>
      <div style="position: relative">
        <img
          v-if="state.picture"
          id="selected-image"
          src="#"
          alt="Selected Image"
          style="border-radius: 3px; width: 120px"
        />
        <img
          @click="state.picture = undefined"
          v-if="state.picture"
          src="/src/assets/ic_clear_white@3x.png"
          width="20"
          height="20"
          style=" cursor: pointer; position: absolute; top 0; left:100px;"
        />
      </div>
    </div>
    <div class="form-field">
      <label>
        Price
        <input
          placeholder="e.g. €150.000"
          :value="state.price"
          @input="event => state.price = (event.target as HTMLInputElement)?.value"
          class="input"
        />
      </label>
      <span :style="{ color: 'red', display: isPriceValid() ? 'none' : 'block' }">
        Please enter a valid price</span
      >
    </div>
    <div style="display: flex; gap: 30px" class="form-field">
      <div style="display: flex; flex-direction: column">
        <label>
          Size
          <input
            placeholder="e.g. 60m2"
            :value="state.size"
            @input="event => state.size = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span :style="{ color: 'red', display: isSizeValid() ? 'none' : 'block' }">
          Please enter a valid size</span
        >
      </div>
      <div style="display: flex; flex-direction: column">
        <label>
          Garage
          <input
            placeholder="Select"
            type="number"
            :value="state.hasGarage"
            @input="event => state.hasGarage = (event.target as HTMLInputElement)?.value"
          />
        </label>
      </div>
    </div>
    <div style="display: flex; gap: 30px" class="form-field">
      <div style="display: flex; flex-direction: column">
        <label>
          Bedrooms
          <input
            placeholder="Enter amount"
            :value="state.bedrooms"
            @input="event => state.bedrooms = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span :style="{ color: 'red', display: isBedroomsValid() ? 'none' : 'block' }">
          Enter a valid number</span
        >
      </div>
      <div style="display: flex; flex-direction: column">
        <label>
          Bathrooms
          <input
            placeholder="Enter amount"
            :value="state.bathrooms"
            @input="event => state.bathrooms = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span :style="{ color: 'red', display: isBathroomsValid() ? 'none' : 'block' }">
          Enter a valid number</span
        >
      </div>
    </div>
    <div class="form-field">
      <label>
        Construction date
        <input
          placeholder="Enter description"
          :value="state.constructionYear"
          @input="event => state.constructionYear = (event.target as HTMLInputElement)?.value"
        />
      </label>
    </div>
    <div class="form-field">
      <label>
        Description
        <textarea
          rows="5"
          placeholder="Enter description"
          required
          :value="state.description"
          @input="event => state.description = (event.target as HTMLInputElement)?.value"
        />
      </label>
      <span :style="{ color: 'red', display: isDescriptionValid() ? 'none' : 'block' }">
        Required field is missing</span
      >
    </div>
    <button @click="submitForm" type="submit" :disabled="!isFormValidate()" class="primary">
      {{ isEditing ? 'EDIT' : 'CREATE' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { T_House } from '@/types/house'
import { reactive } from 'vue'

const props = defineProps<{
  isEditing: boolean
  editPage: boolean
  house?: T_House
}>()

const state = reactive({
  price: props.house ? props.house.price.toString() : '',
  bedrooms: props.house ? props.house.rooms.bedrooms.toString() : '',
  bathrooms: props.house ? props.house.rooms.bathrooms.toString() : '',
  size: props.house ? props.house.size.toString() : '',
  streetName: props.house ? props.house.location.street.toString() : '',
  houseNumber: '',
  numberAddition: '',
  zip: props.house ? props.house.location.zip.toString() : '',
  city: props.house ? props.house.location.city.toString() : '',
  constructionYear: props.house ? props.house.constructionYear.toString() : '',
  hasGarage: props.house ? props.house.hasGarage.toString() : '',
  picture: undefined as File | undefined,
  description: props.house ? props.house.description.toString() : ''
})
// const state2 = reactive({
//   priceValue: '',
//   bedroomsValue: '',
//   bathroomsValue: '',
//   sizeValue: '',
//   streetNameValue: '',
//   houseNumberValue: '',
//   numberAdditionValue: '',
//   zipValue: '',
//   cityValue: '',
//   constructionYearValue: '',
//   hasGarageValue: '',
//   pictureValue: '',
//   descriptionValue: ''
// })

// it is here for referece comparison

// state.price = '210'
// state.bedrooms = '1'
// state.bathrooms = '1'
// state.size = '1'
// state.streetName = 'Overtoom'
// state.houseNumber = '21'
// // state.numberAddition = '1'
// state.zip = '11867787686781TY'
// state.city = 'Amsterdam'
// state.constructionYear = '1968'
// // state.hasGarage = 'trie'
// // state.description = 'Nice houseeeeeeeee!'

async function submitForm(e: any) {
  e.preventDefault()
  var form_data = new FormData()

  for (var key in state) {
    const value = state[key as keyof typeof state]
    if (value) {
      form_data.append(key, value)
    }
  }
  if (props.editPage) {
    const response = fetch('https://api.intern.d-tt.nl/api/houses/' + props.house?.id, {
      method: 'POST',
      headers: {
        'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
      },
      body: form_data
    })

    try {
      const createdHouse = await (await response).json()
      sendImage(createdHouse.id)
    } catch (err) {
      console.error(err)
      alert('Error happened')
    }
  } else {
    const response = fetch('https://api.intern.d-tt.nl/api/houses', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
      },
      body: form_data
    })

    try {
      const createdHouse = await (await response).json()
      sendImage(createdHouse.id)
    } catch (err) {
      console.error(err)
      alert('Error happened')
    }
  }
}

async function sendImage(houseId: number) {
  if (!state.picture) {
    return
  }
  const formData = new FormData()

  formData.append('image', state.picture)
  const response = fetch('https://api.intern.d-tt.nl/api/houses/' + houseId + '/upload', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
    },
    body: formData
  })
  console.log(response)
}
// function isFormValidate() {
//   if (
//     priceValue.trim() &&
//     bedroomsValue.trim() &&
//     bathroomsValue.trim() &&
//     sizeValue.trim() &&
//     streetNameValue.trim() &&
//     houseNumberValue.trim() &&
//     zipValue.trim() &&
//     cityValue.trim() &&
//     constructionYearValue.trim() &&
//     hasGarageValue.trim() &&
//     pictureValue.trim() &&
//     descriptionValue.trim()
//   ) {
//     return true
//   } else {
//     return false
//   }}

function isFormValidate() {
  if (
    isDescriptionValid() &&
    isPriceValid() &&
    isBedroomsValid() &&
    isBathroomsValid() &&
    isCityValid() &&
    state.constructionYear.trim() &&
    state.hasGarage.trim() &&
    isHouseNumberValid() &&
    isSizeValid() &&
    isStreetValid() &&
    isPostalCodeValid()
  ) {
    return true
  } else {
    return false
  }
}

function isDescriptionValid() {
  if (state.description.trim()) {
    return true
  } else {
    return false
  }
}

function isPriceValid() {
  if (state.price.trim() && Number(state.price.trim())) {
    return true
  } else {
    return false
  }
}

function isBedroomsValid() {
  if (state.bedrooms.trim() && Number(state.bedrooms.trim())) {
    return true
  } else {
    return false
  }
}
function isBathroomsValid() {
  if (state.bedrooms.trim() && Number(state.bedrooms.trim())) {
    return true
  } else {
    return false
  }
}
function isCityValid() {
  if (state.city.trim() && /^[a-zA-Z\s]+$/.test(state.city.trim())) {
    return true
  } else {
    return false
  }
}
function isStreetValid() {
  if (state.streetName.trim() && /^[a-zA-Z\s0-9]+$/.test(state.streetName.trim())) {
    return true
  } else {
    return false
  }
}
function isHouseNumberValid() {
  if (state.houseNumber.trim() && Number(state.houseNumber.trim())) {
    return true
  } else {
    return false
  }
}

function isPostalCodeValid() {
  if (state.zip.trim() && /^([0-9]{4}[ ]+[a-zA-Z]{2})$/.test(state.zip.trim())) {
    return true
  } else {
    return false
  }
}
function isSizeValid() {
  if (state.size.trim()) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped>
input,
textarea {
  padding: 15px;
  display: block;
  border-radius: 5px;
  border: none;
  margin: 10px 0 0 0;
  width: 100%;
}
span {
  font-size: 12px;
}
label {
  font-weight: bold;
}
.form-field {
  margin: 10px 0 20px;
  width: 350px;
}
textarea {
  display: block;
  font-family: 'Montserrat', 'Open Sans', Verdana, lucida, sans-serif;
}
</style>
