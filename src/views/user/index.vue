<template>
  <v-container fluid>
    <DataTable
      ref="dataTableRef"
      title="Users"
      :headers="headers"
      :items="users"
      :loading="loading"
      :limit="pagination.limit"
      :total-items="pagination.total"
      :page="pagination.page"
      @update:page="handlePageChange"
      @update:items-per-page="handleItemsPerPageChange"
      @view="handleView"
      @edit="handleEdit"
      @delete-confirmed="handleDeleteConfirmed"
    >
      <template v-slot:[`item.userTypes.name`]="{ item }">
        <v-chip color="primary" size="small">
          {{ item.userTypes.name }}
        </v-chip>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        <span v-if="item.createdAt">{{ formatDate(item.createdAt) }}</span>
        <span v-else class="empty-value">-</span>
      </template>
    </DataTable>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { IUser } from '@/types/user/user.model'

import DataTable from '@/common/DataTable/index.vue'
import userServices from '@/services/user.services'
import { formatDate } from '@/utils/helperFunctions'

// Refs
const dataTableRef = ref<{
  showError: (msg: string) => void
  showSuccess: (msg: string) => void
} | null>(null)
const users = ref<IUser[]>([])
const loading = ref(true)

const pagination = reactive({
  page: 1,
  totalPages: 0,
  limit: 5,
  total: 0,
})

// Table headers
const headers = [
  { title: 'First Name', key: 'firstName', sortable: false },
  { title: 'Last Name', key: 'lastName', sortable: false },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'Phone', key: 'phone', sortable: false },
  { title: 'Province', key: 'provinces.name', sortable: false },
  { title: 'User Type', key: 'userTypes.name', sortable: false },
  { title: 'Created At', key: 'createdAt', sortable: false },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

const fetchUsers = async () => {
  loading.value = true
  const {
    data,
    message,
    success,
    pagination: paginationData,
  } = await userServices.getUsers(pagination.page, pagination.limit)

  users.value = data || []
  pagination.page = paginationData?.page || 1
  pagination.totalPages = paginationData?.totalPages || 1
  pagination.total = paginationData?.total || 0

  if (!success || !data) {
    dataTableRef.value?.showError(message || 'Failed to load users')
  }

  loading.value = false
}

const handlePageChange = async (page: number) => {
  pagination.page = page
  await fetchUsers()
}

const handleItemsPerPageChange = async (itemsPerPage: number) => {
  pagination.limit = itemsPerPage
  pagination.page = 1
  await fetchUsers()
}

// Handle view user
const handleView = (user: IUser) => {
  console.log('View user:', user)
  dataTableRef.value?.showSuccess(`Viewing user: ${user.firstName} ${user.lastName}`)
}

// Handle edit user
const handleEdit = (user: IUser) => {
  console.log('Edit user:', user)
  dataTableRef.value?.showSuccess(`Editing user: ${user.firstName} ${user.lastName}`)
}

// Handle delete confirmed
const handleDeleteConfirmed = async (user: IUser) => {
  console.log('Delete user:', user)
}

// Initialize
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.empty-value {
  color: #999;
  font-style: italic;
}
</style>
