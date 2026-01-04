<template>
  <v-app>
    <template v-if="showSidebar">
      <v-layout>
        <Sidebar />
        <v-main>
          <v-container fluid>
            <router-view />
          </v-container>
        </v-main>
      </v-layout>
    </template>

    <template v-else>
      <router-view />
    </template>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar/index.vue'
import { RouterEnum } from './enums/router.enum'

const route = useRoute()

// Sidebar should not be shown on login and register pages
const showSidebar = computed(() => {
  const routesWithoutSidebar = [RouterEnum.LOGIN, RouterEnum.REGISTER]
  return !routesWithoutSidebar.includes(route.name as RouterEnum)
})
</script>
