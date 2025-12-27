<template>
  <div class="register-page">
    <v-container class="fill-height">
      <v-row align-content="center" justify="center">
        <v-col>
          <v-card class="pa-8 register-card" elevation="8" rounded="lg">
            <div class="text-center mb-8">
              <v-icon size="80" color="primary" class="mb-4">mdi-ethereum</v-icon>
              <h2 class="text-h4 font-weight-bold mb-2">Admin Panel</h2>
              <p class="text-h6 text-grey">Web3 Marketplace</p>
            </div>
            <v-form>
              <input-field
                type="text"
                variant="outlined"
                v-model="userInfo.name"
                density="comfortable"
                class="mb-1"
                placeholder="Name"
                autocomplete="off"
              />
              <input-field
                type="text"
                variant="outlined"
                v-model="userInfo.username"
                density="comfortable"
                class="mb-1"
                placeholder="Username"
                autocomplete="off"
              />
              <input-field
                type="email"
                variant="outlined"
                v-model="userInfo.email"
                density="comfortable"
                class="mb-1"
                placeholder="Email"
                autocomplete="off"
              />
              <input-field
                type="password"
                variant="outlined"
                v-model="userInfo.password"
                density="comfortable"
                class="mb-1"
                placeholder="Password"
              />
              <input-field
                type="password"
                variant="outlined"
                v-model="userInfo.confirmPassword"
                density="comfortable"
                placeholder="Confirm Password"
              />
              <button-field
                block
                color="primary"
                size="large"
                class="mb-5 text-h6"
                @click="handleRegister"
              >
                Register
              </button-field>
              <p class="text-red text-body-1">{{ errorMessage }}</p>
              <div class="text-center">
                <span class="text-grey text-body-1">Already have an account? </span>
                <router-link
                  :to="{ name: RouterEnum.LOGIN as string }"
                  class="text-primary text-decoration-none font-weight-bold text-body-1"
                >
                  Login
                </router-link>
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
import { RouterEnum } from '@/enums/router.enum'

const userInfo = reactive<{
  username: string
  name: string
  email: string
  password: string
  confirmPassword: string
}>({
  username: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')

const handleRegister = async () => {
  console.log(userInfo)
}
</script>

<style scoped lang="scss">
@use '../../assets/views/register.scss';
</style>
