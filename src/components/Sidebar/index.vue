<template>
  <!-- App Bar -->
  <v-app-bar color="primary" elevation="1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Web3 Marketplace Admin</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="handleLogout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="left" width="280">
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.value"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        color="primary"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { RouterEnum } from '@/enums/router.enum'
import { UserTypeEnum } from '@/enums/user.enum'
import { getUserInfoFromToken } from '@/utils/userAuthToken'

// State
const drawer = ref(false)
const router = useRouter()

// Get user info from token
const token = localStorage.getItem('token')
const userInfo = token ? getUserInfoFromToken(token) : null
const userType = userInfo?.userType

const allMenuItems = [
  {
    title: 'Ana Sayfa',
    value: 'home',
    icon: 'mdi-home',
    to: '/',
    roles: [UserTypeEnum.SUPER_ADMIN, UserTypeEnum.ADMIN, UserTypeEnum.GUEST_ADMIN],
  },
  {
    title: 'Kullanıcılar',
    value: 'users',
    icon: 'mdi-account',
    to: '/users',
    roles: [UserTypeEnum.SUPER_ADMIN],
  },
]

const menuItems = computed(() => {
  if (userType) {
    return allMenuItems.filter((item) => item.roles.includes(userType))
  }
  return []
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push({ name: RouterEnum.LOGIN })
}
</script>
