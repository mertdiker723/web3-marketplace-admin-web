<template>
  <v-app-bar color="primary" elevation="1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Web3 Marketplace Admin</v-toolbar-title>

    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <button-field icon v-bind="props" @click.stop class="mr-4">
          <v-avatar color="info" size="large">
            <span class="text-h6">{{ initials }}</span>
          </v-avatar>
        </button-field>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="info">
              <span class="text-h6">{{ initials }}</span>
            </v-avatar>
            <h3 class="mt-2">{{ user?.firstName }} {{ user?.lastName }}</h3>
            <p class="text-caption mt-1">
              {{ user?.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex ga-2">
              <button-field
                class="flex-fill"
                color="info"
                @click="router.push({ name: RouterEnum.PROFILE })"
              >
                Profile
              </button-field>

              <button-field class="flex-fill" color="primary" @click="handleLogout">
                Logout
              </button-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
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
import { useUserStore } from '@/stores/user'
import { getUserInfoFromToken } from '@/utils/userAuthToken'
import { getToken, removeToken } from '@/utils/token'

// State
const drawer = ref(false)
const router = useRouter()
const userStore = useUserStore()

// Get user info from token
const token = getToken()
const userInfo = token ? getUserInfoFromToken(token) : null
const userType = userInfo?.userType

const user = computed(() => userStore.state.data)

const allMenuItems = [
  {
    title: 'Home',
    value: RouterEnum.HOME,
    icon: 'mdi-home',
    to: { name: RouterEnum.HOME },
    roles: [UserTypeEnum.SUPER_ADMIN, UserTypeEnum.ADMIN, UserTypeEnum.GUEST_ADMIN],
  },
  {
    title: 'Users',
    value: RouterEnum.USERS,
    icon: 'mdi-account',
    to: { name: RouterEnum.USERS },
    roles: [UserTypeEnum.SUPER_ADMIN],
  },
  {
    title: 'Brands',
    value: RouterEnum.BRAND,
    icon: 'mdi-tag-multiple',
    to: { name: RouterEnum.BRAND },
    roles: [UserTypeEnum.SUPER_ADMIN],
  },
  {
    title: 'Categories',
    value: RouterEnum.CATEGORY,
    icon: 'mdi-folder-multiple',
    to: { name: RouterEnum.CATEGORY },
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
  removeToken()
  userStore.clearUser()
  router.push({ name: RouterEnum.LOGIN })
}

const initials = computed(() => {
  const userData = user.value
  if (userData && userData.firstName && userData.lastName) {
    return (userData?.firstName.charAt(0) + userData?.lastName.charAt(0)).toUpperCase()
  }
  return 'U'
})
</script>
