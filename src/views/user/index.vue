<template>
  <v-container fluid>
    <DataTable
      ref="dataTableRef"
      title="Users"
      :headers="headers"
      :items="users"
      :loading="loading"
      :show-view-button="true"
      :show-edit-button="true"
      :show-delete-button="true"
      delete-dialog-title="Delete User"
      delete-dialog-text="Are you sure you want to delete this user?"
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
import { ref, onMounted } from 'vue'
import DataTable from '@/common/DataTable/index.vue'
import userServices from '@/services/user.services'
import { formatDate } from '@/utils/helperFunctions'
import type { IUser } from '@/types/user/user.model'

// Refs
const dataTableRef = ref<{
  showError: (msg: string) => void
  showSuccess: (msg: string) => void
} | null>(null)
const users = ref<IUser[]>([])
const loading = ref(true)

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
  const { data, message, success } = await userServices.getUsers()

  users.value = data || []

  if (!success || !data) {
    dataTableRef.value?.showError(message || 'Failed to load users')
    return
  }

  loading.value = false
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
