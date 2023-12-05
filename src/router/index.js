import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateRegistroView from '../views/CreateRegistroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listarRegistros',
      component: HomeView
    },
    {
      path: '/crear_registro',
      name: 'crearRegistro',
      component: CreateRegistroView
    }
  ]
})

export default router
