<template>
  <div class="new">
    <RouterLink to="/new"
      ><button class="create-new primary">
        <img class="upload-image" src="/src/assets/ic_plus_white@3x.png" />
        <img class="upload-image-mobile" src="/src/assets/ic_plus_grey@3x.png" />
        <span> CREATE NEW</span>
      </button></RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.create-new {
  cursor: pointer;
}
.upload-image {
  width: 15px;
  position: relative;
  top: 2px;
  margin-right: 12px;
}
.upload-image-mobile {
  width: 22px;
}

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
    top: 8px;
  }
}
@media (min-width: 800px) {
  .upload-image-mobile {
    display: none;
  }
}
</style>
