<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const answer = ref('')
const model = ref('')
const feedback = ref('')
const relevance = ref(3)
const coherence = ref(3)
const clarity = ref(3)
const truth = ref(3)
const tone = ref(3)

onMounted(() => {
  answer.value = localStorage.getItem('eval_chosen') || ''
  model.value = localStorage.getItem('eval_model') || ''
})

const saveEvaluation = () => {
  console.log({
    modelo: model.value,
    feedback: feedback.value,
    parametros: {
      relevância: relevance.value,
      coerência: coherence.value,
      clareza: clarity.value,
      veracidade: truth.value,
      tom: tone.value,
    },
  })

  alert('Avaliação salva!')

  const other = localStorage.getItem('eval_other')
  const otherModel = localStorage.getItem('eval_other_model')

  if (other && otherModel && answer.value !== other) {
    localStorage.setItem('eval_chosen', other)
    localStorage.setItem('eval_model', otherModel)
    localStorage.removeItem('eval_other')
    localStorage.removeItem('eval_other_model')
    router.go(0)
  } else {
    localStorage.clear()
    router.push('/')
  }
}
</script>

<template>
  <div class="layout">
    <Sidebar />

    <main class="conteudo">
      <div class="avaliacao">
        <div class="superior">
          <div class="bloco1">
            <h2 style="margin-bottom: 1rem">{{ model }} - Avaliação</h2>
            <div class="answer-box">
              {{ answer }}
            </div>
          </div>
          <div class="sliders">
            <h3 style="margin-bottom: 1rem">Critérios de avaliação</h3>
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
        </div>
        <h4>Feedback escrito</h4>
        <textarea v-model="feedback" placeholder="Digite aqui seu feedback..."></textarea>

        <button @click="saveEvaluation">Salvar avaliação</button>
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

.answer-box {
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.6em;
  border: 1px solid #555;
  border-radius: 8px;
  color: #f0f0f0;
  white-space: pre-wrap;
}

.answer-box::-webkit-scrollbar {
  width: 6px;
}

.answer-box::-webkit-scrollbar-track {
  background: transparent;
}

.answer-box::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 2px solid transparent;
  background-clip: content-box;
  transition: background-color 0.3s ease;
}

.answer-box::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.conteudo {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  box-sizing: border-box;
  background-color: #0f0f0f;
}

.avaliacao {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 2em;
  max-width: 1200px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #222629;
  box-sizing: border-box;
  gap: 1.5em;
}

.superior {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}

.bloco1 {
  flex: 1;
}

.sliders {
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  font-size: 12pt;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #222629;
  outline: none;
  color: #f0f0f0;
  resize: none;
  padding: 14px;
  height: 100px;
}

button {
  margin-top: 1em;
  align-self: flex-end;
  background-color: #00aaff;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}
</style>
