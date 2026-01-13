<template>
  <modal-field
    :model-value="brandFormModal"
    @update:model-value="handleClose"
    :title="selectedBrand ? 'Edit Brand' : 'Add Brand'"
    :show-default-actions="false"
  >
    <v-form @submit.prevent="handleBrandSubmit">
      <input-field
        v-model="brandName"
        label="Brand Name"
        variant="outlined"
        density="comfortable"
        :class="'mt-2'"
        placeholder="Enter brand name"
        v-bind="brandNameAttrs"
        required
        :error-messages="errors.brandName"
      />
      <div class="d-flex justify-end gap-2">
        <button-field type="submit" color="primary" :loading="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </button-field>
        <button-field type="button" color="grey" :class="'ml-3'" @click="handleClose">
          Cancel
        </button-field>
      </div>
    </v-form>
  </modal-field>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { watch } from 'vue'

// Types
import type { IBrand } from '@/types/brand/brand.model'

// Validation Schemas
import { brandSchema } from '@/validationSchema/brand.schema'

// Services
import brandServices from '@/services/brand.services'

// Stores
import { useSnackbarStore } from '@/stores/snackbar'

const props = defineProps<{
  brandFormModal: boolean
  selectedBrand?: IBrand | null
}>()

const emit = defineEmits<{
  'update:brandFormModal': [value: boolean]
  'update:selectedBrand': [value: IBrand | null]
  'update:fetch-brands': []
}>()

const snackbarStore = useSnackbarStore()

const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldError } = useForm({
  validationSchema: brandSchema,
  validateOnMount: false,
})

const [brandName, brandNameAttrs] = defineField('brandName')

const handleClose = () => {
  emit('update:selectedBrand', null)
  emit('update:brandFormModal', false)
  resetForm()
}

const handleBrandSubmit = handleSubmit(async (values) => {
  const brandData: Partial<IBrand> = {
    name: values.brandName,
  }

  const isUpdate = !!props?.selectedBrand?.id
  const serviceCall = isUpdate
    ? brandServices.updateBrand(props.selectedBrand.id as string, brandData)
    : brandServices.createBrand(brandData)

  const { data, message, success } = await serviceCall

  if (success && data) {
    emit('update:fetch-brands')
    snackbarStore.showSuccess(message)

    if (isUpdate) {
      handleClose()
      return
    }
    resetForm()
  }

  if (!success) {
    snackbarStore.showError(message)
  }
})

watch(
  () => props.selectedBrand,
  (newBrand) => {
    if (newBrand) {
      brandName.value = newBrand.name
      return
    }
    brandName.value = null
  },
  { immediate: true },
)

watch(
  () => props.brandFormModal,
  (isOpen) => {
    if (isOpen) {
      setFieldError('brandName', '')
    }
  },
)
</script>

<style scoped lang="scss"></style>
