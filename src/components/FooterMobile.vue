<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()

function isEditOrCreatePage(): boolean {
  return (
    route.name === 'list' || route.name === 'edit' || route.name === 'new' || route.name === 'house'
  )
}
</script>

<template>
  <div class="footer-container">
    <RouterLink class="list" to="/list">
      <img
        width="30"
        alt="home mobile"
        :src="
          isEditOrCreatePage()
            ? '/src/assets/ic_mobile_navigarion_home_active@3x.png'
            : '/src/assets/ic_mobile_navigarion_home@3x.png'
        "
      />
    </RouterLink>
    <RouterLink class="about" to="/about">
      <img
        width="30"
        alt="about mobile"
        :src="
          isEditOrCreatePage()
            ? '/src/assets/ic_mobile_navigarion_info@3x.png'
            : '/src/assets/ic_mobile_navigarion_info_active@3x.png'
        "
      />
    </RouterLink>
  </div>
</template>

<style scoped>
.list {
  color: #c3c3c3;
  flex: 1;
}

.footer-container {
  padding: 20px 30px;
  display: flex;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 75px;
  height: 75px;
  z-index: 1;
  text-align: center;
}

.about {
  color: #c3c3c3;
  flex: 1;
}
.router-link-exact-active {
  color: black;
  font-weight: bold;
}

@media (min-width: 800px) {
  .footer-container {
    display: none;
  }
}
</style>
