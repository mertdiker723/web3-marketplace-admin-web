<template>
  <div class="login-page">
    <v-container class="fill-height">
      <v-row align-content="center" justify="center">
        <v-col>
          <v-card class="pa-8 login-card" elevation="8" rounded="lg">
            <div class="text-center mb-8">
              <v-icon size="80" color="primary" class="mb-4">mdi-ethereum</v-icon>
              <h2 class="text-h4 font-weight-bold mb-2">Admin Panel</h2>
              <p class="text-h6 text-grey">Web3 Marketplace</p>
            </div>

            <v-form>
              <input-field
                type="email"
                variant="outlined"
                v-model="userInfo.email"
                density="comfortable"
                class="mb-4"
                placeholder="Email"
                autocomplete="off"
              />

              <input-field
                type="password"
                variant="outlined"
                v-model="userInfo.password"
                density="comfortable"
                placeholder="Password"
              />

              <div class="d-flex justify-space-between align-center mb-3">
                <a href="#" class="text-primary text-decoration-none text-body-1"
                  >Forgot Password?</a
                >
              </div>

              <p class="text-red text-body-1 mb-3">{{ errorMessage }}</p>
              <button-field
                block
                color="primary"
                size="large"
                class="mb-5 text-h6"
                @click="handleLogin"
              >
                Login
              </button-field>

              <div class="text-center">
                <span class="text-grey text-body-1">Don't have an account? </span>
                <a href="#" class="text-primary text-decoration-none font-weight-bold text-body-1">
                  Register
                </a>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// Enums
import { RouterEnum } from '@/enums/router.enum'

// Services
import loginServices from '@/services/login.services'

const userInfo = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})

const errorMessage = ref('')

const router = useRouter()

const handleLogin = async () => {
  const { data, message, success } = await loginServices.login({
    email: userInfo.email,
    password: userInfo.password,
  })
  if (!success && !data) {
    errorMessage.value = message
    return
  }

  router.push({ name: RouterEnum.HOME })
}
</script>

<style scoped lang="scss">
@use '../../assets/views/login.scss';
</style>
