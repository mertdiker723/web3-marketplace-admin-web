<template>
  <modal-field
    :model-value="categoryFormModal"
    @update:model-value="handleClose"
    :title="selectedCategory ? 'Edit Category' : 'Add Category'"
    :show-default-actions="false"
  >
    <v-form @submit.prevent="handleCategorySubmit">
      <input-field
        v-model="categoryName"
        label="Category Name"
        variant="outlined"
        density="comfortable"
        :class="'mt-2'"
        placeholder="Enter category name"
        v-bind="categoryNameAttrs"
        required
        :error-messages="errors.categoryName"
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
import type { ICategory } from '@/types/category/category.model'

// Validation Schemas
import { categorySchema } from '@/validationSchema/category.schema'

// Services
import categoryServices from '@/services/category.services'

// Stores
import { useSnackbarStore } from '@/stores/snackbar'

const props = defineProps<{
  categoryFormModal: boolean
  selectedCategory?: ICategory | null
}>()

const emit = defineEmits<{
  'update:categoryFormModal': [value: boolean]
  'update:selectedCategory': [value: ICategory | null]
  'update:fetch-categories': []
}>()

const snackbarStore = useSnackbarStore()

const { errors, handleSubmit, defineField, isSubmitting, resetForm, setFieldError } = useForm({
  validationSchema: categorySchema,
  validateOnMount: false,
})

const [categoryName, categoryNameAttrs] = defineField('categoryName')

const handleClose = () => {
  emit('update:selectedCategory', null)
  emit('update:categoryFormModal', false)
  resetForm()
}

const handleCategorySubmit = handleSubmit(async (values) => {
  const categoryData: Partial<ICategory> = {
    name: values.categoryName,
  }

  const isUpdate = !!props?.selectedCategory?.id
  const serviceCall = isUpdate
    ? categoryServices.updateCategory(props.selectedCategory.id as string, categoryData)
    : categoryServices.createCategory(categoryData)

  const { data, message, success } = await serviceCall

  if (success && data) {
    emit('update:fetch-categories')
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
  () => props.selectedCategory,
  (newCategory) => {
    if (newCategory) {
      categoryName.value = newCategory.name
      return
    }
    categoryName.value = null
  },
  { immediate: true },
)

watch(
  () => props.categoryFormModal,
  (isOpen) => {
    if (isOpen) {
      setFieldError('categoryName', '')
    }
  },
)
</script>

<style scoped lang="scss"></style>
