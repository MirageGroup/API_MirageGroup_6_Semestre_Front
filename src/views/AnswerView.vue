<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Prompt from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Sidebar from '@/components/Sidebar.vue';
const route = useRoute();
const model1Response = ref("Aguardando resposta...");
const model2Response = ref("Aguardando resposta...");
const currentText = ref(route.query.text as string || "");

const sendToAPI = async (text: string) => {
  if (!text.trim()) return;

  model1Response.value = "Aguardando resposta...";
  model2Response.value = "Aguardando resposta...";

  const apiUrl = "http://localhost:8090/api/v1/chat/input";
  const payloads = [
    { llm_model: "model1", text },
    { llm_model: "model2", text }
  ];

  try {
    const requests = payloads.map(payload =>
      axios.post(apiUrl, payload)
    );

    const responses = await Promise.all(requests);
    model1Response.value = responses[0].data;
    model2Response.value = responses[1].data;
  } catch (error) {
    console.error("Erro ao enviar a requisição:", error);
    model1Response.value = "Erro ao obter resposta.";
    model2Response.value = "Erro ao obter resposta.";
  }
};

onMounted(() => {
  if (currentText.value) {
    sendToAPI(currentText.value);
  }
});

watch(() => route.query.text, (newText) => {
  if (newText) {
    currentText.value = newText as string;
    sendToAPI(currentText.value);
  }
});
</script>

<template>
  <div style="display: flex;">

    <Sidebar/>
    <main class="container">
      <div class="cards">
        <div class="card-1">
          <p>Modelo 1</p>
          <Card title="Resposta 1" :content="model1Response" />
        </div>
        <div class="card-2">
          <p>Modelo 2</p>
          <Card title="Resposta 2" :content="model2Response" />
        </div>
      </div>
      <Prompt @send="sendToAPI" />
    </main>
  </div>
  </template>


<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  padding-bottom: 2em;
}

.cards {
  display: flex;
  width: 70%;
  max-height: 50em;
  justify-content: center;
  padding: 1em;
  margin-bottom: 3em;
}

.card-1, .card-2 {
  width: 100%;
  justify-items: start;
}
</style>