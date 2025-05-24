<script setup lang="ts">
import { useRouter } from 'vue-router'
import Prompt from '@/components/Input.vue'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()

const goToAnswer = (text: string) => {
  if (text.trim()) {
    router.push({ path: '/answer', query: { text } })
  }
}
</script>

<template>
  <div class="layout">
    <Sidebar />

    <main class="conteudo">
      <div class="welcome">
        <img src="../components/icons/logo.svg" alt="logo" />
        <h1>Bem-Vindo(a)!</h1>
        <Prompt @send="goToAnswer" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background-color: #1a1a1a;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 20px;
}

.conteudo {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 2em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0f0f0f;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1em;
}

img {
  width: 250px;
}

h1 {
  font-size: 3em;
  color: white;
}
</style>
