import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const user = useUserStore()
        if (!user.isAuthenticated)
          next({ name: 'enter' })

        else
          next()
      },
    },
    {
      path: '/enter',
      name: 'enter',
      component: () => import('../views/EnterView.vue'),
    },
    {
      path: '/add-book',
      name: 'addBook',
      component: () => import('../views/AddBookView.vue'),
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('../views/BookView.vue'),
    },
  ],
})

export default router
