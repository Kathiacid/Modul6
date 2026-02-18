// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BookLayout from '../layouts/BookLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import BestiaryView from '../views/BestiaryView.vue'
import MonsterDetail from '../views/MonsterDetail.vue' // Importamos la nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BookLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        { path: 'bestiary', name: 'bestiary', component: BestiaryView },
        // Nueva ruta dinámica:
        {
          path: 'monster/:id',
          name: 'monster-detail',
          component: MonsterDetail,
          props: true // Permite que el id llegue como prop a MonsterDetail
        }
      ]
    }
  ]
})

export default router
