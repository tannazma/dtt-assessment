<template class="create-new">
  <div class="new">
    <RouterLink to="/new"
      ><button class="create-new primary">
        <img
          style="width: 15px; position: relative; top: 2px; margin-right: 12px"
          class="upload-image"
          src="/src/assets/ic_plus_white@3x.png"
        />
        <img style="width: 22px" class="upload-image-gray" src="/src/assets/ic_plus_grey@3x.png" />
        <span> CREATE NEW</span>
      </button></RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
@media (max-width: 800px) {
  .create-new {
    background-color: transparent;
    color: black;
  }

  span {
    display: none;
  }
  .upload-image {
    display: none;
  }
  .new {
    position: absolute;
    right: 15px;
    top: 8px
  }
}
@media (min-width: 800px) {
  .upload-image-gray {
    display: none;
  }
}
</style>
