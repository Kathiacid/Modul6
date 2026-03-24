// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BookLayout from '../layouts/BookLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import BestiaryView from '../views/BestiaryView.vue'
import MonsterDetail from '../views/MonsterDetail.vue'
import MonsterStats from '../views/MonsterStats.vue'
import MonsterLore from '../views/MonsterLore.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BookLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        {path: '/:pathMatch(.*)*',name: 'not-found',
        component: () => import('../views/LostInTheDungeon.vue')},
        { path: 'bestiary', name: 'bestiary', component: BestiaryView },
        {
          path: 'monster/:id',
          component: MonsterDetail,
          props: true,
          children: [
            { path: '', name: 'monster-detail', component: MonsterStats },
            { path: 'lore', name: 'monster-lore', component: MonsterLore }
          ]
        }
      ]
    }
  ]
})

export default router
