<template>
  <v-container class="pa-0">
    <div class="d-flex justify-end">
      <button-field color="primary" btn-class="mt-4 mb-4" @click="handleCategoryFormModal(null)">
        Add Category
      </button-field>
    </div>

    <data-table
      title="Categories"
      :headers="headers"
      :items="categories"
      :loading="loading"
      :showViewButton="false"
      :button-loading="buttonLoading"
      :total-items="pagination.total"
      v-model:limit="pagination.limit"
      v-model:page="pagination.page"
      @edit="handleCategoryFormModal"
      @delete-confirmed="handleDeleteConfirmed"
    />
  </v-container>

  <CategoryFormModal
    v-model:category-form-modal="categoryFormModal"
    v-model:selected-category="selectedCategory"
    @update:fetch-categories="fetchCategories"
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import CategoryFormModal from '@/components/Category/modals/CategoryFormModal.vue'
import categoryServices from '@/services/category.services'
import { useSnackbarStore } from '@/stores/snackbar'
import type { ICategory } from '@/types/category/category.model'
import { formatDate } from '@/utils/helperFunctions'

const snackbarStore = useSnackbarStore()

const headers = [
  { title: 'Name', key: 'name', sortable: false },
  { title: 'Created At', key: 'createdAt', sortable: false },
  { title: 'Updated At', key: 'updatedAt', sortable: false },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

const pagination = reactive({
  page: 1,
  totalPages: 0,
  limit: 10,
  total: 0,
})

const loading = ref(false)
const buttonLoading = ref(false)
const categoryFormModal = ref(false)
const selectedCategory = ref<ICategory | null>(null)
const categories = ref<ICategory[]>([])

const fetchCategories = async () => {
  loading.value = true
  const {
    data,
    message,
    success,
    pagination: paginationData,
  } = await categoryServices.getCategories(pagination.page, pagination.limit)

  categories.value =
    data?.map((category) => ({
      ...category,
      createdAt: formatDate(category.createdAt),
      updatedAt: formatDate(category.updatedAt),
    })) || []

  if (paginationData?.page && paginationData.page !== pagination.page) {
    pagination.page = paginationData.page
  }
  pagination.totalPages = paginationData?.totalPages || 1
  pagination.total = paginationData?.total || 0

  if (!success || !data) {
    snackbarStore.showError(message)
  }

  loading.value = false
}

const fetchCategoryById = async (id: string) => {
  buttonLoading.value = true
  const { success, data, message } = await categoryServices.getCategoryById(id)
  if (success && data) {
    selectedCategory.value = data
    categoryFormModal.value = true
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

const handleCategoryFormModal = async (category?: ICategory | null) => {
  if (category?.id) {
    await fetchCategoryById(category.id as string)
    return
  }
  selectedCategory.value = null
  categoryFormModal.value = true
}

const handleDeleteConfirmed = async (category: ICategory) => {
  if (!category.id) return
  buttonLoading.value = true
  const { success, message, data } = await categoryServices.deleteCategory(category.id)
  if (success && data) {
    snackbarStore.showSuccess(message)

    if (categories.value.length === 1 && pagination.page > 1) {
      pagination.page = pagination.page - 1
    } else {
      await fetchCategories()
    }
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

watch(
  () => [pagination.page, pagination.limit],
  async () => {
    await fetchCategories()
  },
  { immediate: true },
)
</script>
