<template>
  <div class="dialog">
    <div class="dialog-box">
      <h2 class="dialog-title">Delete listing</h2>
      <div class="dialog-content">
        <p>Are you sure you want to delete this listing?</p>
        <p style="text-align: center">This action can not be undone.</p>
      </div>
      <div class="dialog-buttons">
        <button class="dialog-button-yes primary" @click="confirmDelete">YES, DELETE</button>
        <!-- close the dialog when we press Go back -->
        <button class="dialog-button-no secondary" @click="close">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'close'): void
}>()

function confirmDelete() {
  emit('delete')
}

function close() {
  emit('close')
}
</script>

<style scoped>
.dialog {
  position: fixed;
  display: grid;
  place-items: center;
  color: black;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.dialog-box {
  background-color: white;
  padding: 43px 78px;
  border-radius: 3px;
}
.dialog-title {
  text-align: center;
  margin-bottom: 20px;
}
.dialog-content {
  align-content: center;
  color: gray;
  margin-bottom: 45px;
}
.dialog-buttons {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dialog-button-yes {
  width: 315px;
  padding: 10px;
  border-radius: 8px;
  border: 1px;
  cursor: pointer;
}
.dialog-button-no {
  width: 315px;
  padding: 10px;
  border-radius: 8px;
  border: 1px;
  cursor: pointer;
}

@media (max-width: 800px) {
  .dialog-box {
    padding: 16px 16px;
  }
}
</style>
