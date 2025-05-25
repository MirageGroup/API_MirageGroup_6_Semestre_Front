<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Prompt from '@/components/Input.vue'
import Card from '@/components/Card.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const model1Response = ref('Aguardando resposta...')
const model2Response = ref('Aguardando resposta...')
const currentText = ref((route.query.text as string) || '')

const typeWriterEffect = (text: string, delay: number = 5) => {
  let index = 0
  const displayedText = ref('')
  const interval = setInterval(() => {
    if (index < text.length) {
      displayedText.value += text[index]
      index++
    } else {
      clearInterval(interval)
    }
  }, delay)
  return displayedText
}

const router = useRouter()

const goToEvaluation = (chosenModel: string) => {
  const chosenText = localStorage.getItem(chosenModel === 'Modelo 1' ? 'model1' : 'model2') || ''
  const otherText = localStorage.getItem(chosenModel === 'Modelo 1' ? 'model2' : 'model1') || ''
  const otherModel = chosenModel === 'Modelo 1' ? 'Modelo 2' : 'Modelo 1'

  localStorage.setItem('eval_chosen', chosenText)
  localStorage.setItem('eval_model', chosenModel)
  localStorage.setItem('eval_other', otherText)
  localStorage.setItem('eval_other_model', otherModel)

  router.push({ path: '/evaluate' })
}

const sendToAPI = async (text: string) => {
  if (!text.trim()) return

  model1Response.value = 'Aguardando resposta...'
  model2Response.value = 'Aguardando resposta...'

  const apiUrl = 'http://localhost:8090/api/v1/chat/input'
  const payloads = [
    { llm_model: 'model1', text },
    { llm_model: 'model2', text },
  ]

  try {
    const requests = payloads.map((payload) => axios.post(apiUrl, payload))
    const responses = await Promise.all(requests)

    // console.log(responses[0].data.response.join(''))

    const model1Text = responses[0].data.response.join('').trim()
    const model2Text = responses[1].data.response.join('').trim()

    const tempoDeExecucaoModel1 = responses[0].data.tempo_execucao
    const tempoDeExecucaoModel2 = responses[1].data.tempo_execucao

    console.log(tempoDeExecucaoModel1, tempoDeExecucaoModel2)

    model1Response.value = typeWriterEffect(model1Text)
    model2Response.value = typeWriterEffect(model2Text)

    localStorage.setItem('model1', model1Text)
    localStorage.setItem('model2', model2Text)

    localStorage.setItem('model1_time', tempoDeExecucaoModel1.toString())
    localStorage.setItem('model2_time', tempoDeExecucaoModel2.toString())
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    model1Response.value = 'Erro ao obter resposta.'
    model2Response.value = 'Erro ao obter resposta.'
  }
}

onMounted(() => {
  if (currentText.value) {
    sendToAPI(currentText.value)
  }
})

watch(
  () => route.query.text,
  (newText) => {
    if (newText) {
      currentText.value = newText as string
      sendToAPI(currentText.value)
    }
  },
)
</script>

<template>
  <div class="layout">
    <Sidebar />
    <main class="conteudo">
      <div class="container">
        <div class="cards">
          <div class="card-1">
            <p>Modelo 1</p>
            <Card title="Resposta 1" :content="model1Response">
              <template #default>
                <button @click="goToEvaluation('Modelo 1')" class="select-btn">
                  Selecionar como melhor
                </button>
              </template>
            </Card>
          </div>
          <div class="card-2">
            <p>Modelo 2</p>
            <Card title="Resposta 2" :content="model2Response">
              <template #default>
                <button @click="goToEvaluation('Modelo 2')" class="select-btn">
                  Selecionar como melhor
                </button>
              </template>
            </Card>
          </div>
        </div>
        <Prompt @send="sendToAPI" />
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
.conteudo {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 2em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0f0f0f;
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
.container {
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  padding-bottom: 2em;
}
.cards {
  display: flex;
  width: 86%;
  max-height: 50em;
  justify-content: center;
  padding: 1em;
  margin-bottom: 3em;
  gap: 2em;
}
.card-1,
.card-2 {
  width: 100%;
  justify-items: start;
}
.select-btn {
  margin-top: 1em;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #00b4f0;
  color: white;
  cursor: pointer;
}
.select-btn:hover {
  background-color: #0095c5;
}
</style>
