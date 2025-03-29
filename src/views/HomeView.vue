<script setup lang="ts">
import { useRouter } from 'vue-router';
import Prompt from '@/components/Input.vue';

const router = useRouter();

const goToAnswer = (text: string) => {
  if (text.trim()) {
    router.push({ path: '/answer', query: { text } });
  }
};
</script>

<template>
  <main class="container">
    <div class="welcome">
      <img src="../components/icons/logo.svg" alt="logo">
      <h1>Bem-Vindo(a)!</h1>
    </div>
    <Prompt @send="goToAnswer" />
  </main>
</template>


<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center; 
}

.welcome {
  display: grid; 
  place-items: center;
}

img {
  width: 250px;
}

h1 {
  font-size: 3em;
}
</style>
