import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
	{
		path: '/results',
		name: 'results',
		component: () => import('../views/Results.vue')
	},
    {
      path: '/overlay',
      name: 'overlay',
      component: () => import('../views/Overlay.vue')
    }
  ]
})

export default router
