<template>
  <form>
    <div class="form-field">
      <label>
        Street name
        <input
          placeholder="Enter the street name"
          :value="state.streetName"
          @input="event => state.streetName = (event.target as HTMLInputElement)?.value"
          :style="{ border: isStreetValid() ? 'none' : '1px solid red' }"
        />
      </label>
      <span :style="{ color: 'red', display: isStreetValid() ? 'none' : 'block' }">
        Required field is missing</span
      >
    </div>
    <div class="form-field-tow">
      <div class="addition">
        <label>
          House Number
          <input
            placeholder="Enter house number"
            :value="state.houseNumber"
            @input="event => state.houseNumber = (event.target as HTMLInputElement)?.value"
            :style="{ border: isHouseNumberValid() ? 'none' : '1px solid red' }"
          />
        </label>
        <span :style="{ color: 'red', display: isHouseNumberValid() ? 'none' : 'block' }">
          Required field is missing</span
        >
      </div>
      <div class="addition">
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
          :style="{ border: isPostalCodeValid() ? 'none' : '1px solid red' }"
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
          :style="{ border: isCityValid() ? 'none' : '1px solid red' }"
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
          :style="{ border: isPriceValid() ? 'none' : '1px solid red' }"
        />
      </label>
      <span :style="{ color: 'red', display: isPriceValid() ? 'none' : 'block' }">
        Please enter a valid price</span
      >
    </div>
    <div class="form-field-tow">
      <div class="addition">
        <label>
          Size
          <input
            placeholder="e.g. 60m2"
            :value="state.size"
            @input="event => state.size = (event.target as HTMLInputElement)?.value"
            :style="{ border: isSizeValid() ? 'none' : '1px solid red' }"
          />
        </label>
        <span :style="{ color: 'red', display: isSizeValid() ? 'none' : 'block' }">
          Please enter a valid size</span
        >
      </div>
      <div class="addition">
        <label>
          Garage
          <select
            placeholder="Select"
            type="boolean"
            :value="state.hasGarage"
            @input="event => state.hasGarage = (event.target as HTMLInputElement)?.value"
            :style="{ border: isGarageValid() ? 'none' : '1px solid red' }"
            class="garage"
          >
            <option value="Yes" style="color: red">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <span :style="{ color: 'red', display: isGarageValid() ? 'none' : 'block' }">
          Enter a valid number</span
        >
      </div>
    </div>
    <div class="form-field-tow">
      <div style="display: flex; flex-direction: column">
        <label>
          Bedrooms
          <input
            placeholder="Enter amount"
            :value="state.bedrooms"
            @input="event => state.bedrooms = (event.target as HTMLInputElement)?.value"
            :style="{ border: isBedroomsValid() ? 'none' : '1px solid red' }"
          />
        </label>
        <span :style="{ color: 'red', display: isBedroomsValid() ? 'none' : 'block' }">
          Enter a valid number</span
        >
      </div>
      <div class="addition">
        <label>
          Bathrooms
          <input
            placeholder="Enter amount"
            :value="state.bathrooms"
            @input="event => state.bathrooms = (event.target as HTMLInputElement)?.value"
            :style="{ border: isBathroomsValid() ? 'none' : '1px solid red' }"
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
          :style="{ border: isYearValid() ? 'none' : '1px solid red' }"
        />
      </label>
      <span :style="{ color: 'red', display: isYearValid() ? 'none' : 'block' }">
        Enter a valid year</span
      >
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
          :style="{ border: isYearValid() ? 'none' : '1px solid red' }"
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
import { useRouter } from 'vue-router'

const props = defineProps<{
  isEditing: boolean
  editPage: boolean
  house?: T_House
}>()

const router = useRouter()
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
  if (props.editPage && props.house?.id) {
    fetch('https://api.intern.d-tt.nl/api/houses/' + props.house.id, {
      method: 'POST',
      headers: {
        'X-Api-Key': 'ndFAUDTBMW7xO6YsIL3-Gb5rSQu4ZoHz'
      },
      body: form_data
    })

    sendImage(props.house.id)
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
      await sendImage(createdHouse.id)
      router.push('/house/' + createdHouse.id)
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
  const response = await fetch('https://api.intern.d-tt.nl/api/houses/' + houseId + '/upload', {
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
    isYearValid() &&
    isGarageValid() &&
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

function isGarageValid() {
  if (state.hasGarage.trim() && Boolean(state.hasGarage.trim())) {
    return true
  } else {
    return false
  }
}

function isYearValid() {
  if (
    state.constructionYear.trim() &&
    Number(state.constructionYear.trim()) &&
    /^[12][0-9]{3}$/.test(state.constructionYear.trim())
  ) {
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
  if (state.bathrooms.trim() && Number(state.bathrooms.trim())) {
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
  if (state.size.trim() && /\d+[,.]?\d*\s*/.test(state.size.trim())) {
    return true
  } else {
    return false
  }
}

function newFunction() {
  return 'garage'
}

function newFunction_1() {
  return 'garage'
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
.form-field-tow {
  display: flex;
  gap: 30px;
  margin: 10px 0 20px;
  width: 350px;
}
.addition {
  display: flex;
  flex-direction: column;
}
textarea {
  display: block;
  font-family: 'Montserrat', 'Open Sans', Verdana, lucida, sans-serif;
}

button:disabled {
  opacity: 0.5;
}
.garage {
  padding: 15px;
  display: block;
  border-radius: 5px;
  border: none;
  margin: 10px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-field,
.form-field-tow > div {
  flex: 1;
}
</style>
