import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue' // Use relative path
import Books from '../pages/Books.vue' // Use relative path

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: Books },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
