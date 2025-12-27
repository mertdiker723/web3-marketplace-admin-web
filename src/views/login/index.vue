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

            <v-form @submit.prevent="handleLogin">
              <input-field
                type="email"
                variant="outlined"
                v-model="email"
                v-bind="emailAttrs"
                density="comfortable"
                class="mb-4"
                placeholder="Email"
                autocomplete="off"
                :error-messages="errors.email"
              />

              <input-field
                type="password"
                variant="outlined"
                v-model="password"
                v-bind="passwordAttrs"
                density="comfortable"
                placeholder="Password"
                :error-messages="errors.password"
              />

              <div class="d-flex justify-space-between align-center mb-3">
                <a href="#" class="text-primary text-decoration-none text-body-1"
                  >Forgot Password?</a
                >
              </div>

              <p class="text-red text-body-1 mb-3">{{ errorMessage }}</p>
              <button-field
                type="submit"
                block
                color="primary"
                size="large"
                class="mb-5 text-h6"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Loading...' : 'Login' }}
              </button-field>

              <div class="text-center">
                <span class="text-grey text-body-1">Don't have an account? </span>
                <router-link
                  :to="{ name: RouterEnum.REGISTER as string }"
                  class="text-primary text-decoration-none font-weight-bold text-body-1"
                >
                  Register
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

// Schema
import { loginSchema } from '@/validationSchema/login.schema'

// Enums
import { RouterEnum } from '@/enums/router.enum'

// Services
import loginServices from '@/services/login.services'

// Router
const router = useRouter()

// Refs
const errorMessage = ref('')

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: loginSchema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const handleLogin = handleSubmit(async (values) => {
  errorMessage.value = ''

  const { data, message, success } = await loginServices.login(values)

  if (!success && !data) {
    errorMessage.value = message
    return
  }

  router.push({ name: RouterEnum.HOME })
})
</script>

<style scoped lang="scss">
@use '../../assets/views/login.scss';
</style>
