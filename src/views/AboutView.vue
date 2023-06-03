<template>
  <div>
    <h2>About Dtt Real Estate</h2>
    <!-- ALL THESE about- prefixes are unnecessary -->
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt saepe cum, accusamus
      provident maiores quaerat cupiditate laboriosam, quis adipisci, deserunt tempore itaque cumque
      doloribus molestias praesentium odio ad quisquam nostrum.
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <h2>Desin and Development</h2>
    <div class="about-logo-container">
        <img src="src/assets/img_logo_dtt@3x.png" class="about-logo" alt="dtt logo" />
      <div class="by-dtt">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl" class="dtt-site">www.d-tt.nl </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
p {
  padding-top: 30px;
  color: gray;
}
h2 {
  padding-top: 30px;
}
.about-logo-container {
  display: flex;
  align-items: flex-end;
}
.by-dtt {
  padding-top: 25px;
  padding-left: 20px;
}
.about-logo {
  width: 200px;
  padding-top: 20px;
}
.dtt-site {
  color: #2b83b0;
}
</style>
