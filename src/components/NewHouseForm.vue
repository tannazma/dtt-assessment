<template>
  <form>
    <div class="form-field">
      <label>
        Street name
        <input
          placeholder="Enter the street name"
          :value="formState.streetName"
          @input="event => formState.streetName = (event.target as HTMLInputElement)?.value"
          :style="{
            border: isStreetValid() || !state.showErrorMessages ? 'none' : '1px solid red'
          }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isStreetValid() ? 'none' : 'block' }"
      >
        Required field is missing</span
      >
    </div>
    <div class="form-field-two">
      <div>
        <label>
          House Number
          <input
            placeholder="Enter house number"
            :value="formState.houseNumber"
            @input="event => formState.houseNumber = (event.target as HTMLInputElement)?.value"
            :style="{
              border:
                isNumberValid(formState.houseNumber) || !state.showErrorMessages
                  ? 'none'
                  : '1px solid red'
            }"
          />
        </label>
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isNumberValid(state.showErrorMessages) ? 'none' : 'block' }"
        >
          Required field is missing</span
        >
      </div>
      <div>
        <label>
          Addition
          <input
            :value="formState.numberAddition"
            @input="event => formState.numberAddition = (event.target as HTMLInputElement)?.value"
          />
        </label>
        <span class="span-optional" :style="{ display: 'block' }"> This is optional</span>
      </div>
    </div>
    <div class="form-field">
      <label>
        Postal code
        <input
          placeholder="e.g. 1000 AA"
          :value="formState.zip"
          @input="event => formState.zip = (event.target as HTMLInputElement)?.value"
          :style="{
            border: isPostalCodeValid() || !state.showErrorMessages ? 'none' : '1px solid red'
          }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isPostalCodeValid() ? 'none' : 'block' }"
      >
        Please enter a valid postal code</span
      >
    </div>
    <div class="form-field">
      <label>
        City
        <input
          placeholder="e.g. Utreckt"
          :value="formState.city"
          @input="event => formState.city = (event.target as HTMLInputElement)?.value"
          :style="{ border: isCityValid() || !state.showErrorMessages ? 'none' : '1px solid red' }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isCityValid() ? 'none' : 'block' }"
      >
        Please enter a valid city</span
      >
    </div>
    <div class="form-field">
      <label>
        Upload picture (JPG or PNG)
        <div v-if="!formState.picture && !props.house?.image" class="upload-picture-placeholder">
          <img width="25" src="/src/assets/ic_plus_grey@3x.png" />
        </div>
        <input
          onchange="document.getElementById('selected-image').src = window.URL.createObjectURL(this.files[0])"
          type="file"
          @input="event => formState.picture = (event.target as HTMLInputElement)?.files?.[0]"
          :style="{
            border: isPicturetValid() || !state.showErrorMessages ? 'none' : '1px solid red'
          }"
        />
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isPicturetValid() ? 'none' : 'block' }"
        >
          Required field is missing</span
        >
      </label>
      <div>
        <img
          v-if="formState.picture || props.house?.image"
          id="selected-image"
          src="#"
          alt="Selected Image"
          class="selected-image"
        />
        <img
          @click="formState.picture = undefined"
          v-if="formState.picture"
          src="/src/assets/ic_clear_white@3x.png"
          width="20"
          height="20"
          class="clear-icon"
        />
      </div>
    </div>
    <div class="form-field">
      <label>
        Price
        <input
          placeholder="e.g. €150.000"
          :value="formState.price"
          @input="event => formState.price = (event.target as HTMLInputElement)?.value"
          class="input"
          :style="{
            border:
              isNumberValid(formState.price) || !state.showErrorMessages ? 'none' : '1px solid red'
          }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isNumberValid(formState.price) ? 'none' : 'block' }"
      >
        Please enter a valid price</span
      >
    </div>
    <div class="form-field-two">
      <div>
        <label>
          Size
          <input
            placeholder="e.g. 60m2"
            :value="formState.size"
            @input="event => formState.size = (event.target as HTMLInputElement)?.value"
            :style="{
              border: isSizeValid() || !state.showErrorMessages ? 'none' : '1px solid red'
            }"
          />
        </label>
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isSizeValid() ? 'none' : 'block' }"
        >
          Please enter a valid size</span
        >
      </div>
      <div>
        <label>
          Garage
          <select
            placeholder="Select"
            type="boolean"
            :value="formState.hasGarage"
            @input="event => formState.hasGarage = (event.target as HTMLInputElement)?.value"
            :style="{
              border:
                isNumberValid(formState.hasGarage) || !state.showErrorMessages
                  ? 'none'
                  : '1px solid red'
            }"
            class="garage"
          >
            <option value="Yes" class="option-yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isNumberValid(formState.hasGarage) ? 'none' : 'block' }"
        >
          Enter a valid number</span
        >
      </div>
    </div>
    <div class="form-field-two">
      <div class="bedroom-container">
        <label>
          Bedrooms
          <input
            placeholder="Enter amount"
            :value="formState.bedrooms"
            @input="event => formState.bedrooms = (event.target as HTMLInputElement)?.value"
            :style="{
              border:
                isNumberValid(formState.bedrooms) || !state.showErrorMessages
                  ? 'none'
                  : '1px solid red'
            }"
          />
        </label>
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isNumberValid(formState.bedrooms) ? 'none' : 'block' }"
        >
          Enter a valid number</span
        >
      </div>
      <div>
        <label>
          Bathrooms
          <input
            placeholder="Enter amount"
            :value="formState.bathrooms"
            @input="event => formState.bathrooms = (event.target as HTMLInputElement)?.value"
            :style="{
              border:
                isNumberValid(formState.bathrooms) || !state.showErrorMessages
                  ? 'none'
                  : '1px solid red'
            }"
          />
        </label>
        <span
          class="error-message"
          v-if="state.showErrorMessages"
          :style="{ display: isNumberValid(formState.bathrooms) ? 'none' : 'block' }"
        >
          Enter a valid number</span
        >
      </div>
    </div>
    <div class="form-field">
      <label>
        Construction date
        <input
          placeholder="Enter description"
          :value="formState.constructionYear"
          @input="event => formState.constructionYear = (event.target as HTMLInputElement)?.value"
          :style="{ border: isYearValid() || !state.showErrorMessages ? 'none' : '1px solid red' }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isYearValid() ? 'none' : 'block' }"
      >
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
          :value="formState.description"
          @input="event => formState.description = (event.target as HTMLInputElement)?.value"
          :style="{ border: isYearValid() || !state.showErrorMessages ? 'none' : '1px solid red' }"
        />
      </label>
      <span
        class="error-message"
        v-if="state.showErrorMessages"
        :style="{ display: isDescriptionValid() ? 'none' : 'block' }"
      >
        Required field is missing</span
      >
    </div>
    <button @click="submitForm" type="submit" class="primary">
      {{ isEditing ? 'EDIT' : 'CREATE' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { T_House } from '@/types/house'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { sendImage } from '@/stores/Api-call'
import { sendHouseForEdit } from '@/stores/Api-call'
import { sendImageForCreateHouse } from '@/stores/Api-call'

const props = defineProps<{
  isEditing: boolean
  editPage: boolean
  house?: T_House
}>()

const router = useRouter()
const formState = reactive({
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
const state = reactive<{
  showErrorMessages: boolean
}>({ showErrorMessages: false })

onMounted(() => {
  if (props.house) {
    const selectImage = document.getElementById('selected-image') as HTMLImageElement
    selectImage.src = props.house.image
  }
})

async function submitForm(e: any) {
  state.showErrorMessages = true
  e.preventDefault()

  if (!isFormValidate()) {
    return
  }

  var form_data = new FormData()

  for (var key in formState) {
    const value = formState[key as keyof typeof formState]
    if (value) {
      form_data.append(key, value)
    }
  }

  if (props.editPage && props.house?.id) {
    await sendHouseForEdit(props.house.id, form_data)

    await sendImage(props.house.id, formState.picture)
    router.push('/house/' + props.house.id)
  } else {
    try {
      const createdHouse = await sendImageForCreateHouse(form_data)
      await sendImage(createdHouse.id, formState.picture)
      router.push('/house/' + createdHouse.id)
    } catch (err) {
      console.error(err)
      alert('Error happened')
    }
  }
}

function isFormValidate() {
  if (
    isDescriptionValid() &&
    isNumberValid(formState.price) &&
    isNumberValid(formState.bedrooms) &&
    isNumberValid(formState.bathrooms) &&
    isNumberValid(formState.hasGarage) &&
    isNumberValid(formState.houseNumber) &&
    isCityValid() &&
    isYearValid() &&
    isSizeValid() &&
    isStreetValid() &&
    isPostalCodeValid() &&
    isPicturetValid()
  ) {
    return true
  } else {
    return false
  }
}

function isDescriptionValid() {
  if (formState.description) {
    return true
  } else {
    return false
  }
}

function isNumberValid(fieldValue: any) {
  if (fieldValue) {
    return true
  } else {
    return false
  }
}

function isYearValid() {
  if (formState.constructionYear && /^[12][0-9]{3}$/.test(formState.constructionYear)) {
    return true
  } else {
    return false
  }
}

function isCityValid() {
  if (formState.city && /^[a-zA-Z\s]+$/.test(formState.city)) {
    return true
  } else {
    return false
  }
}
function isPicturetValid() {
  if (formState.picture || props.house?.image) {
    return true
  } else {
    return false
  }
}
function isStreetValid() {
  if (formState.streetName && /^[a-zA-Z\s0-9]+$/.test(formState.streetName)) {
    return true
  } else {
    return false
  }
}

function isPostalCodeValid() {
  if (formState.zip && /^([0-9]{4}[ ]{0,1}[a-zA-Z]{2})$/.test(formState.zip)) {
    return true
  } else {
    return false
  }
}
function isSizeValid() {
  if (formState.size && /\d+[,.]?\d*\s*/.test(formState.size)) {
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
.error-message {
  color: red;
}
.span-optional {
  color: blue;
}
.upload-picture-placeholder {
  font-size: 50px;
  margin-top: 10px;
  border: 3px dashed #c3c3c3;
  width: 78px;
  height: 84px;
}
.upload-picture-placeholder img {
  margin-left: 23px;
  margin-bottom: 8px;
}
input[type='file'] {
  display: none;
}

.selected-image {
  border-radius: 3px;
  width: 120px;
}
.clear-icon {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 100px;
}
.option-yes {
  color: red;
}
.bedroom-container {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
}
form {
  padding-bottom: 10px;
}
.form-field {
  margin: 10px 0 20px;
  width: 350px;
}
.form-field-two {
  display: flex;
  gap: 30px;
  margin: 10px 0 20px;
  width: 350px;
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
.form-field-two > div {
  flex: 1;
}
</style>
