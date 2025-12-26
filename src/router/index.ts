import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/index.vue')
const Login = () => import('../views/login/index.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
