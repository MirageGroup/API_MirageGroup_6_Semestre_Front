import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnswerView from '@/views/AnswerView.vue'
import Evaluation from '@/views/Evaluate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/evaluate',
      name: 'evaluation',
      component: Evaluation, 
    },
    {
      path: '/answer',
      name: 'answer',
      component: AnswerView,
    },
  ],
})

export default router
