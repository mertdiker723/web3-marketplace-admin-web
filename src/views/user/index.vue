<template>
  <v-container class="pa-0 mt-16 mb-4">
    <data-table
      ref="dataTableRef"
      title="Users"
      :headers="headers"
      :items="users"
      :loading="loading"
      :total-items="pagination.total"
      :button-loading="buttonLoading"
      v-model:limit="pagination.limit"
      v-model:page="pagination.page"
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

      <template v-slot:[`item.actions`]="{ item }">
        <button-field
          color="info"
          size="small"
          btn-class="mr-2"
          :loading="buttonLoading"
          @click="handleView(item)"
        >
          View
        </button-field>
        <button-field
          color="primary"
          size="small"
          btn-class="mr-2"
          :loading="buttonLoading"
          :disabled="item.userTypes.id === UserTypeEnum.SUPER_ADMIN"
          @click="handleEdit(item)"
        >
          Edit
        </button-field>
        <button-field
          color="error"
          size="small"
          :loading="buttonLoading"
          :disabled="item.userTypes.id === UserTypeEnum.SUPER_ADMIN"
          @click="handleDelete(item)"
        >
          Delete
        </button-field>
      </template>
    </data-table>

    <UserViewModal v-model="viewDialog" :user="selectedUser" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import type { IUser } from '@/types/user/user.model'
import UserViewModal from '@/components/User/modals/userViewModal.vue'
import userServices from '@/services/user.services'
import { formatDate } from '@/utils/helperFunctions'
import { RouterEnum } from '@/enums/router.enum'
import { UserTypeEnum } from '@/enums/user.enum'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

// Refs
const dataTableRef = ref<{
  handleDeleteClick?: (item: IUser) => void
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

const handleView = async (user: IUser) => {
  buttonLoading.value = true
  const { success, data, message } = await userServices.getSelectedUser(user.id)

  if (success && data) {
    selectedUser.value = data
    viewDialog.value = true
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

const handleEdit = (user: IUser) => {
  if (user.userTypes.id === UserTypeEnum.SUPER_ADMIN) {
    return
  }
  router.push({ name: RouterEnum.USER_FORM, params: { id: user.id } })
}

const handleDelete = (user: IUser) => {
  if (user.userTypes.id === UserTypeEnum.SUPER_ADMIN) {
    return
  }

  if (dataTableRef.value?.handleDeleteClick) {
    dataTableRef.value.handleDeleteClick(user)
  }
}

const handleDeleteConfirmed = async (user: IUser) => {
  buttonLoading.value = true
  const { success, message } = await userServices.deleteUser(user.id)
  if (success) {
    snackbarStore.showSuccess(message)

    if (users.value.length === 1 && pagination.page > 1) {
      pagination.page = pagination.page - 1
    } else {
      await fetchUsers()
    }
  } else {
    snackbarStore.showError(message)
  }
  buttonLoading.value = false
}

watch(
  () => [pagination.page, pagination.limit],
  async () => {
    await fetchUsers()
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.empty-value {
  color: #999;
  font-style: italic;
}

:deep(.v-btn--disabled) {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
  pointer-events: auto !important;
}
</style>
