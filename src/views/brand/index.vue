<template>
  <v-container class="pa-0">
    <div class="d-flex justify-end">
      <button-field color="primary" btn-class="mt-4 mb-4" @click="handleBrandFormModal(null)">
        Add Brand
      </button-field>
    </div>

    <data-table
      title="Brands"
      :headers="headers"
      :items="brands"
      :loading="loading"
      :showViewButton="false"
      :button-loading="buttonLoading"
      :total-items="pagination.total"
      v-model:limit="pagination.limit"
      v-model:page="pagination.page"
      @edit="handleBrandFormModal"
      @delete-confirmed="handleDeleteConfirmed"
    />
  </v-container>

  <BrandFormModal
    v-model:brand-form-modal="brandFormModal"
    v-model:selected-brand="selectedBrand"
    @update:fetch-brands="fetchBrands"
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import BrandFormModal from '@/components/Brand/modals/BrandFormModal.vue'
import brandServices from '@/services/brand.services'
import { useSnackbarStore } from '@/stores/snackbar'
import type { IBrand } from '@/types/brand/brand.model'
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
const brandFormModal = ref(false)
const selectedBrand = ref<IBrand | null>(null)
const brands = ref<IBrand[]>([])

const fetchBrands = async () => {
  loading.value = true
  const {
    data,
    message,
    success,
    pagination: paginationData,
  } = await brandServices.getBrands(pagination.page, pagination.limit)

  brands.value =
    data?.map((brand) => ({
      ...brand,
      createdAt: formatDate(brand.createdAt),
      updatedAt: formatDate(brand.updatedAt),
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

const fetchBrandById = async (id: string) => {
  buttonLoading.value = true
  const { success, data, message } = await brandServices.getBrandById(id)
  if (success && data) {
    selectedBrand.value = data
    brandFormModal.value = true
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

const handleBrandFormModal = async (brand?: IBrand | null) => {
  if (brand?.id) {
    await fetchBrandById(brand.id as string)
    return
  }
  selectedBrand.value = null
  brandFormModal.value = true
}

const handleDeleteConfirmed = async (brand: IBrand) => {
  if (!brand.id) return
  buttonLoading.value = true
  const { success, message, data } = await brandServices.deleteBrand(brand.id)
  if (success && data) {
    snackbarStore.showSuccess(message)

    if (brands.value.length === 1 && pagination.page > 1) {
      pagination.page = pagination.page - 1
    } else {
      await fetchBrands()
    }
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

watch(
  () => [pagination.page, pagination.limit],
  async () => {
    await fetchBrands()
  },
  { immediate: true },
)
</script>
