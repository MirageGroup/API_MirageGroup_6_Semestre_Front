<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const inputText = ref('');
const emit = defineEmits(['send']);

const sendMessage = () => {
  if (inputText.value.trim()) {
    emit('send', inputText.value);
    inputText.value = ''; 
  }
};


</script>

<template>
  <div class="input">
    <textarea v-model="inputText" placeholder="Digite aqui sua pergunta"></textarea>
    <button @click="sendMessage">
      <img src="./icons/send_button.svg" alt="Enviar">
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.input {
    display: flex; 
    margin-right: 4em; 
    width: 70%; 
    padding: 5px; 
    padding-inline: 20px; 
    border-radius: 12px; 
    background-color: #222629;
}

textarea {
    align-content: center;
    font-family: "Inter";
    font-weight: 200;
    font-size: 22px;
    width: 100%;
    height: 3em;
    max-height: 12em; 
    border: none; 
    border-radius: 5px; 
    background-color: #222629;
    outline: none;
    color: #f0f0f0;
    resize: none;
    padding: 10px;
    scrollbar-width: none;
}

textarea::placeholder {
    color: #f0f0f0;
}

button {
    border: none;
    background-color: transparent; 
    color: #00B4F0; 
    font-weight: bold; 
    padding-inline: 5px;
    cursor: pointer;
}

</style>