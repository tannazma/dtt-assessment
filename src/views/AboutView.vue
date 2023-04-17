<template>
  <div>
    <h2 class="about">About Dtt Real Estate</h2>
    <p style="padding-top: 30px; color: gray">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt saepe cum, accusamus
      provident maiores quaerat cupiditate laboriosam, quis adipisci, deserunt tempore itaque cumque
      doloribus molestias praesentium odio ad quisquam nostrum.
    </p>
    <p style="padding-top: 30px; color: gray">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <h2 style="padding-top: 30px">Desin and Development</h2>
    <div style="display: flex">
      <div style="display:flex">
        <img src="src/assets/img_logo_dtt@3x.png" style="width: 200px; padding-top: 20px" />
      </div>
      <div style="padding-top:25px; padding-left:20px">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl" style="color: #2b83b0 ">www.d-tt.nl </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
</script>

<style scoped>
.about {
  padding-top: 40px;
}
</style>
