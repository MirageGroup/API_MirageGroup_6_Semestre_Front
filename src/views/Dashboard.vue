<template>
  <div class="layout">
    <Sidebar />
    <main class="conteudo">
      <div class="dashboard">
        <div class="card">
          <h2>Comparativo de Modelos</h2>
          <LineChart :chart-data="chartData" />
        </div>

        <div class="card">
          <h2>Tempo de Resposta</h2>
          <canvas ref="tempoRespostaChart"></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import LineChart from '@/components/LineChart.vue'
import Sidebar from '@/components/Sidebar.vue'
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

type Avaliacao = {
  model: string
  data: string
  avaliacaoMedia: number
  tempoRespostaMs: number
}

const chartData = ref({
  labels: [] as string[],
  datasets: [] as any[],
})

const tempoRespostaChart = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  const res = await axios.get('http://localhost:8090/avaliacoes')
  const avaliacoes = res.data as Avaliacao[]

  const mediaPorModelo: Record<string, Record<string, number[]>> = {}
  const tempoPorModelo: Record<string, Record<string, number[]>> = {}

  for (const av of avaliacoes) {
    const dataFormatada = new Date(av.data).toLocaleDateString('pt-BR') // apenas dia/mês/ano
    const modelo = av.model

    // Agrupar avaliação média
    if (!mediaPorModelo[modelo]) mediaPorModelo[modelo] = {}
    if (!mediaPorModelo[modelo][dataFormatada]) mediaPorModelo[modelo][dataFormatada] = []
    mediaPorModelo[modelo][dataFormatada].push(av.avaliacaoMedia)

    // Agrupar tempo de resposta
    if (!tempoPorModelo[modelo]) tempoPorModelo[modelo] = {}
    if (!tempoPorModelo[modelo][dataFormatada]) tempoPorModelo[modelo][dataFormatada] = []
    tempoPorModelo[modelo][dataFormatada].push(av.tempoRespostaMs)
  }

  // Construir datasets de Avaliação Média (LineChart.vue)
  const datasUnicas = Array.from(
    new Set(Object.values(mediaPorModelo).flatMap((porData) => Object.keys(porData))),
  ).sort()

  chartData.value = {
    labels: datasUnicas,
    datasets: Object.entries(mediaPorModelo).map(([modelo, porData]) => ({
      label: modelo,
      data: datasUnicas.map((data) => {
        const valores = porData[data] || []
        const media = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0
        return { x: data, y: parseFloat(media.toFixed(2)) }
      }),
      tension: 0.3,
    })),
  }

  // Construir datasets de Tempo de Resposta (canvas)
  if (tempoRespostaChart.value) {
    new ChartJS(tempoRespostaChart.value, {
      type: 'line',
      data: {
        labels: datasUnicas,
        datasets: Object.entries(tempoPorModelo).map(([modelo, porData]) => ({
          label: modelo,
          data: datasUnicas.map((data) => {
            const valores = porData[data] || []
            const media = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0
            return parseFloat(media.toFixed(6))
          }),
          borderColor: modelo === 'Modelo 1' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
          backgroundColor:
            modelo === 'Modelo 1' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tempo Médio de Resposta por Dia (ms)',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Tempo (ms)' },
          },
        },
      },
    })
  }
})
</script>

<style scoped>
.canvas {
  width: 100% !important;
  height: 300px !important;
}

.card {
  background-color: #2a2a2a;
  padding: 1.5em;
  margin-bottom: 2em;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.card h2 {
  margin-bottom: 1em;
  color: #fff;
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
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 20px;
}

.conteudo {
  flex-grow: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-color: #0f0f0f;
  box-sizing: border-box;
}

.dashboard {
  width: 100%;
  max-width: 800px;
  background-color: transparent;
  border-radius: 10px;
  max-height: 100%;
  padding: 2em;
}

h2 {
  color: white;
  margin-bottom: 1em;
}
</style>
