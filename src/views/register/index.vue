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
            <v-form @submit.prevent="handleRegister">
              <input-field
                type="text"
                variant="outlined"
                v-model="firstName"
                v-bind="firstNameAttrs"
                density="comfortable"
                class="mb-2"
                placeholder="First Name"
                autocomplete="off"
                :error-messages="errors.firstName"
              />
              <input-field
                type="text"
                variant="outlined"
                v-model="lastName"
                v-bind="lastNameAttrs"
                density="comfortable"
                class="mb-2"
                placeholder="Last Name"
                autocomplete="off"
                :error-messages="errors.lastName"
              />
              <input-field
                type="email"
                variant="outlined"
                v-model="email"
                v-bind="emailAttrs"
                density="comfortable"
                class="mb-2"
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
                class="mb-2"
                placeholder="Password"
                :error-messages="errors.password"
              />
              <input-field
                type="password"
                variant="outlined"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                density="comfortable"
                class="mb-2"
                placeholder="Confirm Password"
                :error-messages="errors.confirmPassword"
              />
              <button-field
                block
                color="primary"
                size="large"
                class="mb-5 text-h6"
                type="submit"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Loading...' : 'Register' }}
              </button-field>
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
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

// Enums
import { RouterEnum } from '@/enums/router.enum'

// Schema
import { registerSchema } from '@/validationSchema/register.schema'

// Services
import registerServices from '@/services/register.services'

// Stores
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

// Router
const router = useRouter()

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: registerSchema,
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const handleRegister = handleSubmit(async (values) => {
  const { data, message, success } = await registerServices.register(values)

  if (!success && !data) {
    snackbarStore.showError(message || 'Registration failed')
    return
  }

  snackbarStore.showSuccess('Registration successful!')
  router.push({ name: RouterEnum.HOME })
})
</script>

<style scoped lang="scss">
@use '../../assets/views/register.scss';
</style>
