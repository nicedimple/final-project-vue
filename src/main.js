// import { createApp } from 'vue'
// import App from './App.vue'
// import { createRouter, createWebHistory } from 'vue-router'
// import Home from './pages/Home.vue' // Ensure the path is correct
// import Books from './pages/Books.vue' // Ensure the path is correct

// const routes = [
//   { path: '/', component: Home },
//   { path: '/books', component: Books },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// createApp(App).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import BorrowedBooks from './pages/BorrowedBooks.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/borrowed-books', component: BorrowedBooks },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
