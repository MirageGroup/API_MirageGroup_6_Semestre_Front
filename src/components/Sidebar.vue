<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome() {
  router.push({ name: 'home' })
}

function goToDash() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <aside class="sidebar">
    <img class="logo" src="../components/icons/logo.svg" alt="logo" />
    <button class="new-chat-btn" @click="goToHome">
      <img class="btn-icon" src="./icons/plus.svg" /> Novo chat
    </button>
    <button class="new-chat-btn" @click="goToDash">
      <img class="chart-icon" src="./icons/chart.svg" /> Dashboard
    </button>
  </aside>
</template>

<style scoped>
.chart-icon {
  width: 8%;
  filter: brightness(0) saturate(100%) invert(62%) sepia(76%) saturate(2346%) hue-rotate(172deg)
    brightness(98%) contrast(101%);
}

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
  display: flex;
  gap: 2em;
  flex-direction: column;
  align-items: center;
  padding-inline: 20px;
}

.logo {
  width: 100px;
  margin-top: 4em;
  margin-bottom: 3em;
}

.new-chat-btn {
  background-color: #222629;
  color: white;
  font-family: 'Inter';
  font-weight: 400;
  text-align: left;
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.new-chat-btn:hover {
  background-color: #454545;
}
</style>
