<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="800">
      <v-card-title>
        <h2>Edit User</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleEdit">
          <v-row class="align-start">
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
              <input-field
                v-model="lastName"
                v-bind="lastNameAttrs"
                placeholder="Enter last name"
                density="comfortable"
                type="text"
                variant="outlined"
                :error-messages="errors.lastName"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <input-field
                v-model="email"
                v-bind="emailAttrs"
                placeholder="Enter email"
                disabled
                density="comfortable"
                type="email"
                variant="outlined"
                :error-messages="errors.email"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <input-field
                type="text"
                variant="outlined"
                v-model="phone"
                disabled
                v-bind="phoneAttrs"
                density="comfortable"
                placeholder="Enter phone number"
                :error-messages="errors.phone"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <select-box-field
                v-model="provinceId"
                v-bind="provinceIdAttrs"
                @update:modelValue="getDistrictsByProvince"
                :items="provinces"
                item-title="name"
                item-value="id"
                disabled
                variant="outlined"
                density="comfortable"
                placeholder="Select province"
                :error-messages="errors.provinceId"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <select-box-field
                v-model="districtId"
                v-bind="districtIdAttrs"
                @update:modelValue="getNeighborhoodsByDistrict"
                :items="districts"
                item-title="name"
                item-value="id"
                disabled
                variant="outlined"
                density="comfortable"
                placeholder="Select district"
                :error-messages="errors.districtId"
                :loading="districtLoading"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <select-box-field
                v-model="neighborhoodId"
                v-bind="neighborhoodIdAttrs"
                :items="neighborhoods"
                item-title="name"
                item-value="id"
                disabled
                variant="outlined"
                density="comfortable"
                placeholder="Select neighborhood"
                :error-messages="errors.neighborhoodId"
                :loading="neighborhoodLoading"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <select-box-field
                v-model="userTypeId"
                v-bind="userTypeIdAttrs"
                :items="userTypes"
                item-title="name"
                item-value="id"
                variant="outlined"
                density="comfortable"
                placeholder="Select user type"
                :error-messages="errors.userTypeId"
                clearable
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <text-area
                type="textarea"
                variant="outlined"
                v-model="openAddress"
                v-bind="openAddressAttrs"
                disabled
                density="comfortable"
                placeholder="Enter open address"
                :error-messages="errors.openAddress"
              />
            </v-col>
          </v-row>

          <Button type="submit" color="primary" :loading="isSubmitting"> Save </Button>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validate as uuidValidate } from 'uuid'
import { useForm } from 'vee-validate'

// Types
import type { IDistrict, INeighborhood, IProvince } from '@/types/location/location.model'
import type { IUserType } from '@/types/user/user.model'

import { RouterEnum } from '@/enums/router.enum'
import Button from '@/common/Button/index.vue'
import { useSnackbarStore } from '@/stores/snackbar'
import userServices from '@/services/user.services'
import locationServices from '@/services/location.services'
import { UserTypeEnum } from '@/enums/user.enum'
import { userSchema } from '@/validationSchema/user.schema'

const snackbarStore = useSnackbarStore()

const route = useRoute()
const router = useRouter()

const initialLoading = ref(true)
const districtLoading = ref(false)
const neighborhoodLoading = ref(false)

// Locations
const provinces = ref<Array<IProvince>>([])
const districts = ref<Array<IDistrict>>([])
const neighborhoods = ref<Array<INeighborhood>>([])

const userTypes = ref<IUserType[]>([
  {
    id: UserTypeEnum.ADMIN,
    name: 'Admin',
  },
  {
    id: UserTypeEnum.GUEST_ADMIN,
    name: 'Guest Admin',
  },
  {
    id: UserTypeEnum.SUPER_ADMIN,
    name: 'Super Admin',
  },
])

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema: userSchema,
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [openAddress, openAddressAttrs] = defineField('openAddress')
const [provinceId, provinceIdAttrs] = defineField('provinceId')
const [districtId, districtIdAttrs] = defineField('districtId')
const [neighborhoodId, neighborhoodIdAttrs] = defineField('neighborhoodId')
const [userTypeId, userTypeIdAttrs] = defineField('userTypeId')

const getDetailUser = async (userId: string) => {
  initialLoading.value = true
  const { success, data } = await userServices.getSelectedUser(userId)

  if (success && data) {
    const promises = []
    if (data.provinces?.id) {
      promises.push(getDistrictsByProvince(data.provinces.id))
    }
    if (data.districts?.id) {
      promises.push(getNeighborhoodsByDistrict(data.districts.id))
    }
    await Promise.all(promises)

    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email
    phone.value = data.phone
    provinceId.value = data?.provinces?.id || null
    districtId.value = data?.districts?.id || null
    neighborhoodId.value = data?.neighborhoods?.id || null
    openAddress.value = data?.openAddress || ''
    userTypeId.value = data.userTypes.id || null
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

onMounted(async () => {
  const userId = route.params.id as string

  if (!userId || !uuidValidate(userId)) {
    router.push({ name: RouterEnum.USERS })
  } else {
    await Promise.all([getDetailUser(userId), getProvinces()])
  }
})

const handleEdit = handleSubmit(async (values) => {
  if (values.userTypeId) {
    const { data, success, message } = await userServices.updateUser(route.params.id as string, {
      userType: values.userTypeId,
      firstName: values.firstName,
      lastName: values.lastName,
    })

    if (data && success) {
      snackbarStore.showSuccess(message || 'User updated successfully!')
    } else {
      snackbarStore.showError(message || 'Failed to update user')
    }
  }
})
</script>
