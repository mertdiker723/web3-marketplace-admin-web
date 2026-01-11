<template>
  <v-container fluid class="fill-height pa-0">
    <v-row
      class="fill-height ma-0"
      style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%)"
    >
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-sheet color="transparent" class="text-center">
          <v-card flat color="transparent">
            <v-card-text>
              <div
                class="text-h1 font-weight-bold white--text mb-4"
                style="font-size: 8rem; line-height: 1; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3)"
              >
                404
              </div>
              <div class="text-h4 white--text font-weight-medium mb-3">Page Not Found</div>
              <div class="text-body-1 white--text mb-8" style="opacity: 0.9">
                The page you are looking for doesn't exist or has been moved.
              </div>
              <v-btn color="primary" size="large" variant="elevated" @click="goHome">
                Go to Home
              </v-btn>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterEnum } from '@/enums/router.enum'

const router = useRouter()

const goHome = () => {
  router.push({ name: RouterEnum.HOME })
}
</script>
