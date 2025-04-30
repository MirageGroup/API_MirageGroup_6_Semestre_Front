<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  title: String,
  content: String,
});

const visibleContent = ref("Aguardando resposta..."); 

watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      visibleContent.value = ""; 
      setTimeout(() => {
        visibleContent.value = newContent;
      }, 300);
    } else {
      visibleContent.value = "Aguardando resposta..."; 
    }
  },
  { immediate: true } 
);
</script>

<template>
  <div class="card">
    <div class="header-card">
      <h2 class="title">{{ title }}</h2>
    </div>
    <transition name="fade">
      <p v-if="visibleContent" class="content">
        {{ visibleContent }}
      </p>
    </transition>
  </div>
</template>

<style>
.card {
  width: 90%;
  max-height: 40em;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  margin-top: 1em;
  background-color: #222629;
  color: white;
  overflow: auto;
}

/* Estilos do Scroll */
.card::-webkit-scrollbar {
  width: 8px;
}

.card::-webkit-scrollbar-track {
  background: #454545;
  border-radius: 12px;
}

.card::-webkit-scrollbar-thumb {
  background: #292929;
  border-radius: 12px;
}

.card::-webkit-scrollbar-thumb:hover {
  background: #323232;
}

/* Animação de fade-in */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
