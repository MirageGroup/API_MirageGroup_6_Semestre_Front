<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const answer = ref('');
const model = ref('');
const feedback = ref('');
const relevance = ref(3);
const coherence = ref(3);
const clarity = ref(3);
const truth = ref(3);
const tone = ref(3);

onMounted(() => {
  answer.value = route.query.chosen as string;
  model.value = route.query.model as string;
});

const saveEvaluation = () => {
  console.log({
    modelo: model.value,
    resposta: answer.value,
    feedback: feedback.value,
    critérios: {
      relevância: relevance.value,
      coerência: coherence.value,
      clareza: clarity.value,
      veracidade: truth.value,
      tom: tone.value
    }
  });
  alert('Avaliação salva!');
};
</script>

<template>
  <div class="avaliacao">
    <h2>{{ model }} - Avaliação</h2>
    <p>{{ answer }}</p>

    <div class="sliders">
      <label>Relevância: {{ relevance }}</label>
      <input type="range" v-model="relevance" min="1" max="5" />
      <label>Coerência: {{ coherence }}</label>
      <input type="range" v-model="coherence" min="1" max="5" />
      <label>Clareza: {{ clarity }}</label>
      <input type="range" v-model="clarity" min="1" max="5" />
      <label>Veracidade: {{ truth }}</label>
      <input type="range" v-model="truth" min="1" max="5" />
      <label>Tom e Cortesia: {{ tone }}</label>
      <input type="range" v-model="tone" min="1" max="5" />
    </div>

    <textarea v-model="feedback" placeholder="Digite aqui seu feedback..."></textarea>

    <button @click="saveEvaluation">Salvar avaliação</button>
  </div>
</template>

<style scoped>
.avaliacao {
  color: white;
  padding: 2em;
  max-width: 800px;
  margin: auto;
}
textarea {
  width: 100%;
  margin-top: 1em;
  height: 100px;
}
button {
  margin-top: 1em;
  background-color: #00aaff;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}
</style>
