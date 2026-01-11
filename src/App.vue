<template>
  <v-app>
    <template v-if="withSidebar">
      <v-layout>
        <Sidebar />
        <v-main>
          <router-view />
        </v-main>
      </v-layout>
    </template>
    <template v-else>
      <router-view />
    </template>

    <Snackbar
      v-model="snackbarStore.state.show"
      :message="snackbarStore.state.message"
      :color="snackbarStore.state.color"
      :icon="snackbarStore.state.icon"
    />
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Enums
import { RouterEnum } from './enums/router.enum'

// Components
import Sidebar from './components/Sidebar/index.vue'
import Snackbar from './common/Snackbar/index.vue'

// Stores
import { useSnackbarStore } from './stores/snackbar'
import { useUserStore } from './stores/user'

// Services
import userServices from './services/user.services'

// Utils
import { isTokenValid } from './utils/userAuthToken'
import { getToken } from './utils/token'

const snackbarStore = useSnackbarStore()
const userStore = useUserStore()

const route = useRoute()

const withSidebar = computed(() => {
  const routesWithoutSidebar = [RouterEnum.LOGIN, RouterEnum.REGISTER, RouterEnum.NOT_FOUND]
  return !routesWithoutSidebar.includes(route.name as RouterEnum)
})

onMounted(async () => {
  const validToken = isTokenValid(getToken() as string)
  if (validToken && !userStore.state.data) {
    const response = await userServices.getUserMe()

    if (response.success && response.data) {
      userStore.setUser(response.data)
    }
  }
})
</script>
