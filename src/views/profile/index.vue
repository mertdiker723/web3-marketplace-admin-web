<template>
  <ProfileSkeleton v-if="initialLoading" />
  <v-container v-else class="profile-container">
    <v-form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold">Profile</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <input-field
            type="text"
            variant="outlined"
            v-model="firstName"
            v-bind="firstNameAttrs"
            density="comfortable"
            placeholder="Enter first name"
            :error-messages="errors.firstName"
          />
        </v-col>
        <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
          <input-field
            type="text"
            variant="outlined"
            v-model="lastName"
            v-bind="lastNameAttrs"
            density="comfortable"
            placeholder="Enter last name"
            :error-messages="errors.lastName"
          />
        </v-col>
        <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
          <input-field
            type="email"
            variant="outlined"
            v-model="email"
            disabled
            density="comfortable"
            placeholder="Enter email"
          />
        </v-col>
        <v-col>
          <input-field
            type="text"
            variant="outlined"
            v-model="phone"
            v-bind="phoneAttrs"
            density="comfortable"
            placeholder="Enter phone number"
            :error-messages="errors.phone"
          />
        </v-col>
        <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
          <input-field
            type="password"
            variant="outlined"
            v-model="password"
            v-bind="passwordAttrs"
            density="comfortable"
            placeholder="Enter password"
            :error-messages="errors.password"
          />
        </v-col>
        <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
          <input-field
            type="password"
            variant="outlined"
            v-model="confirmPassword"
            v-bind="confirmPasswordAttrs"
            density="comfortable"
            placeholder="Enter confirm password"
            :error-messages="errors.confirmPassword"
          />
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <select-box-field
            v-model="provinceId"
            @update:modelValue="getDistrictsByProvince"
            :items="provinces"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="comfortable"
            placeholder="Select province"
            clearable
          />
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <select-box-field
            v-model="districtId"
            @update:modelValue="getNeighborhoodsByDistrict"
            :items="districts"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="comfortable"
            placeholder="Select district"
            :loading="districtLoading"
            clearable
          />
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <select-box-field
            v-model="neighborhoodId"
            :items="neighborhoods"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="comfortable"
            placeholder="Select neighborhood"
            :loading="neighborhoodLoading"
            clearable
          />
        </v-col>
        <v-col cols="12" class="pt-0">
          <text-area
            type="textarea"
            variant="outlined"
            v-model="openAddress"
            density="comfortable"
            placeholder="Enter open address"
          />
        </v-col>
      </v-row>

      <button-field
        type="submit"
        class="mt-2"
        block
        variant="elevated"
        color="primary"
        :loading="isSubmitting"
      >
        {{ isSubmitting ? 'Loading...' : 'Save' }}
      </button-field>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'

// Components
import ProfileSkeleton from '@/common/Skeletons/profile.skeleton.vue'

// Schema
import { profileSchema } from '@/validationSchema/profile.schema'

import type { IDistrict, IProvince, INeighborhood } from '@/types/location/location.model'
import userServices from '@/services/user.services'
import locationServices from '@/services/location.services'
import { useSnackbarStore } from '@/stores/snackbar'

// Locations
const provinces = ref<Array<IProvince>>([])
const districts = ref<Array<IDistrict>>([])
const neighborhoods = ref<Array<INeighborhood>>([])

const districtLoading = ref(false)
const neighborhoodLoading = ref(false)
const initialLoading = ref(true)

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: profileSchema,
})

const snackbarStore = useSnackbarStore()

const userId = ref('')
const email = ref('')
const provinceId = ref<number | null>(null)
const districtId = ref<number | null>(null)
const neighborhoodId = ref<number | null>(null)
const openAddress = ref('')

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const getDetailProfile = async () => {
  initialLoading.value = true
  const { data, success } = await userServices.getUserMe()

  if (success && data) {
    const promises = []
    if (data.provinces?.id) {
      promises.push(getDistrictsByProvince(data.provinces.id))
    }
    if (data.districts?.id) {
      promises.push(getNeighborhoodsByDistrict(data.districts.id))
    }
    await Promise.all(promises)

    userId.value = data.id
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
    phone.value = data.phone
    provinceId.value = data.provinces.id
    districtId.value = data.districts.id
    neighborhoodId.value = data.neighborhoods.id
    openAddress.value = data.openAddress || ''
  }
  initialLoading.value = false
}

const getProvinces = async () => {
  const { data, success } = await locationServices.getProvinces()
  if (success && data) {
    provinces.value = data
  }
}

const getDistrictsByProvince = async (provinceIdValue: number) => {
  districtId.value = null
  neighborhoodId.value = null
  districts.value = []
  neighborhoods.value = []

  if (!provinceIdValue) return

  districtLoading.value = true
  const { data, success } = await locationServices.getDistrictsByProvince(provinceIdValue)
  if (success && data) {
    districts.value = data
  }
  districtLoading.value = false
}

const getNeighborhoodsByDistrict = async (districtIdValue: number) => {
  neighborhoodId.value = null
  neighborhoods.value = []

  if (!districtIdValue) return

  neighborhoodLoading.value = true
  const { data, success } = await locationServices.getNeighborhoodsByDistrict(districtIdValue)

  if (success && data) {
    neighborhoods.value = data
  }
  neighborhoodLoading.value = false
}

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    ...values,
    provinceId: provinceId.value || null,
    districtId: districtId.value || null,
    neighborhoodId: neighborhoodId.value || null,
    openAddress: openAddress.value || null,
  }
  if (!payload.password) delete payload.password
  if (!payload.confirmPassword) delete payload.confirmPassword

  const { data, success, message } = await userServices.updateProfile(userId.value, payload)
  if (data && success) {
    snackbarStore.showSuccess(message)
    return
  }
  snackbarStore.showError(message)
})

onMounted(async () => {
  await Promise.all([getDetailProfile(), getProvinces()])
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 16px;
}
</style>
