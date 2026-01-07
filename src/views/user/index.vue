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
      :button-loading="buttonLoading"
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

    <UserViewModal v-model="viewDialog" :user="selectedUser" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { IUser } from '@/types/user/user.model'
import DataTable from '@/common/DataTable/index.vue'
import UserViewModal from '@/components/User/modals/userViewModal.vue'
import userServices from '@/services/user.services'
import { formatDate } from '@/utils/helperFunctions'
import { RouterEnum } from '@/enums/router.enum'

// Refs
const dataTableRef = ref<{
  showError: (msg: string) => void
  showSuccess: (msg: string) => void
  handleDeleteSuccess: () => void
} | null>(null)
const users = ref<IUser[]>([])
const loading = ref(true)
const viewDialog = ref(false)
const selectedUser = ref<IUser | null>(null)
const buttonLoading = ref(false)

const pagination = reactive({
  page: 1,
  totalPages: 0,
  limit: 10,
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

const router = useRouter()

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

const handleView = async (user: IUser) => {
  buttonLoading.value = true
  const { success, data } = await userServices.getSelectedUser(user.id)

  if (success && data) {
    selectedUser.value = data
    viewDialog.value = true
  } else {
    dataTableRef.value?.showError('Failed to fetch user details')
  }
  buttonLoading.value = false
}

const handleEdit = (user: IUser) => {
  router.push({ name: RouterEnum.USER_FORM, params: { id: user.id } })
}

const handleDeleteConfirmed = async (user: IUser) => {
  buttonLoading.value = true
  const response = await userServices.deleteUser(user.id)
  if (response.success) {
    dataTableRef.value?.showSuccess('User deleted successfully')
    dataTableRef.value?.handleDeleteSuccess()
    await fetchUsers()
  } else {
    dataTableRef.value?.showError(response.message || 'Failed to delete user')
  }
  buttonLoading.value = false
}

onMounted(async () => {
  await fetchUsers()
})
</script>

<style scoped>
.empty-value {
  color: #999;
  font-style: italic;
}
</style>
