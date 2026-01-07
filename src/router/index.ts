import { RouterEnum } from '@/enums/router.enum'
import { UserTypeEnum } from '@/enums/user.enum'
import { createRouter, createWebHistory } from 'vue-router'

// Utils
import { isTokenValid, getUserInfoFromToken } from '@/utils/userAuthToken'

const Home = () => import('../views/home/index.vue')
const Login = () => import('../views/login/index.vue')
const Register = () => import('../views/register/index.vue')
const User = () => import('../views/user/index.vue')
const UserForm = () => import('../views/userForm/index.vue')

const routes = [
  {
    path: '/',
    name: RouterEnum.HOME,
    component: Home,
    meta: {
      requiresAuth: true,
      allowedRoles: [UserTypeEnum.ADMIN, UserTypeEnum.GUEST_ADMIN, UserTypeEnum.SUPER_ADMIN],
    },
  },
  {
    path: '/login',
    name: RouterEnum.LOGIN,
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: RouterEnum.REGISTER,
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/users',
    name: RouterEnum.USERS,
    component: User,
    meta: { requiresAuth: true, allowedRoles: [UserTypeEnum.SUPER_ADMIN] },
  },
  {
    path: '/userForm/:id?',
    name: RouterEnum.USER_FORM,
    component: UserForm,
    meta: { requiresAuth: true, allowedRoles: [UserTypeEnum.SUPER_ADMIN] },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const withoutAuthRoutes: RouterEnum[] = [RouterEnum.LOGIN, RouterEnum.REGISTER]

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token') as string
  const isTokenValidResult = isTokenValid(token)

  if (token && !isTokenValidResult) {
    localStorage.removeItem('token')
    return next({ name: RouterEnum.LOGIN })
  }

  if (!token && to.meta.requiresAuth) {
    return next({ name: RouterEnum.LOGIN })
  }

  if (token && withoutAuthRoutes.includes(to.name as RouterEnum)) {
    return next({ name: RouterEnum.HOME })
  }

  if (token && to.meta.allowedRoles) {
    const userInfo = getUserInfoFromToken(token)
    if (!userInfo) {
      localStorage.removeItem('token')
      return next({ name: RouterEnum.LOGIN })
    }

    const allowedRoles = to.meta.allowedRoles as number[]
    if (!allowedRoles.includes(userInfo.userType)) {
      return next({ name: RouterEnum.HOME })
    }
  }

  next()
})

export default router
