<template>
  <v-card>
    <TableSkeleton v-if="loading" :title="title" />
    <EmptyState
      v-else-if="items.length === 0"
      :title="errorMessage || emptyStateTitle"
      :description="emptyStateText"
    />
    <div v-else>
      <v-card-title v-if="title">
        <h2>{{ title }}</h2>
      </v-card-title>

      <v-data-table-server
        :headers="headers"
        :items="items"
        :items-per-page="limit"
        :items-per-page-options="[
          { value: 5, title: '5' },
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' },
          { value: 100, title: '100' },
        ]"
        :search="search"
        :items-length="totalItems"
        :page="page"
        @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange"
      >
        <template
          v-for="header in headersWithoutActions"
          :key="header.key"
          v-slot:[`item.${header.key}`]="{ item }"
        >
          <slot :name="`item.${header.key}`" :item="item">
            <span v-if="getPropertyValue(item, header.key)">
              {{ getPropertyValue(item, header.key) }}
            </span>
            <span v-else class="empty-value">-</span>
          </slot>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <slot name="item.actions" :item="item">
            <v-btn
              v-if="showViewButton"
              color="info"
              size="small"
              class="mr-2"
              @click="$emit('view', item)"
            >
              View
            </v-btn>
            <v-btn
              v-if="showEditButton"
              color="primary"
              size="small"
              class="mr-2"
              @click="$emit('edit', item)"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="showDeleteButton"
              color="error"
              size="small"
              @click="handleDeleteClick(item)"
            >
              Delete
            </v-btn>
          </slot>
        </template>
      </v-data-table-server>
    </div>
  </v-card>

  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title>Delete Confirmation</v-card-title>
      <v-card-text>Are you sure you want to delete this record?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteDialog = false">{{ cancelButtonText }}</v-btn>
        <v-btn color="error" @click="confirmDeleteAction">{{ confirmButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <Snackbar
    v-model="showErrorSnackbar"
    :message="errorMessage"
    color="error"
    icon="mdi-alert-circle"
  />

  <Snackbar
    v-model="showSuccessSnackbar"
    :message="successMessage"
    color="success"
    icon="mdi-check-circle"
  />
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<string, string | number | boolean | Date | object | null | undefined>"
>
import { computed, ref } from 'vue'
import EmptyState from '@/common/EmptyState/index.vue'
import TableSkeleton from '@/common/Skeletons/table.skeleton.vue'
import Snackbar from '@/common/Snackbar/index.vue'

const ACTIONS_KEY = 'actions'

interface DataTableHeader {
  title: string
  key: string
  sortable?: boolean
  align?: 'start' | 'center' | 'end'
}

interface Props {
  title: string
  headers: DataTableHeader[]
  items: T[]
  loading?: boolean
  limit?: number
  search?: string
  showViewButton?: boolean
  showEditButton?: boolean
  showDeleteButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  confirmDelete?: boolean
  emptyStateTitle?: string
  emptyStateText?: string
  totalItems?: number
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  limit: 5,
  search: '',
  showViewButton: true,
  showEditButton: true,
  showDeleteButton: true,
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Delete',
  confirmDelete: true,
  emptyStateTitle: 'No Data Available',
  emptyStateText: 'There are no records to display at the moment.',
  totalItems: 0,
  page: 1,
})

const deleteDialog = ref(false)
const itemToDelete = ref<T | null>(null)
const showErrorSnackbar = ref(false)
const showSuccessSnackbar = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const emit = defineEmits<{
  view: [item: T]
  edit: [item: T]
  delete: [item: T]
  deleteConfirmed: [item: T]
  'update:page': [page: number]
  'update:itemsPerPage': [itemsPerPage: number]
}>()

const headersWithoutActions = computed(() => {
  return props.headers.filter((header) => header.key !== ACTIONS_KEY)
})

const getPropertyValue = (obj: T, path: string): string | number | null => {
  const keys = path.split('.')

  let value: unknown = obj

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      return null
    }
  }

  return typeof value === 'string' || typeof value === 'number' ? value : null
}

const handleDeleteClick = (item: T) => {
  if (props.confirmDelete) {
    itemToDelete.value = item
    deleteDialog.value = true
  } else {
    emit('delete', item)
  }
}

const confirmDeleteAction = () => {
  if (itemToDelete.value) {
    emit('deleteConfirmed', itemToDelete.value)
    deleteDialog.value = false
    itemToDelete.value = null
  }
}

const handlePageChange = (page: number) => {
  emit('update:page', page)
}

const handleItemsPerPageChange = (itemsPerPage: number) => {
  emit('update:itemsPerPage', itemsPerPage)
}

defineExpose({
  showError: (message: string) => {
    errorMessage.value = message
    showErrorSnackbar.value = true
  },
  showSuccess: (message: string) => {
    successMessage.value = message
    showSuccessSnackbar.value = true
  },
})
</script>

<style scoped lang="scss">
.empty-value {
  color: #999;
  font-style: italic;
}
</style>
