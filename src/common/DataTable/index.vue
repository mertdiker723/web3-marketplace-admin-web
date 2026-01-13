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
            <Button
              v-if="showViewButton"
              color="info"
              size="small"
              btn-class="mr-2"
              :loading="buttonLoading"
              @click="$emit('view', item)"
            >
              View
            </Button>
            <Button
              v-if="showEditButton"
              color="primary"
              size="small"
              btn-class="mr-2"
              :loading="buttonLoading"
              @click="$emit('edit', item)"
            >
              Edit
            </Button>
            <Button
              v-if="showDeleteButton"
              color="error"
              size="small"
              :loading="buttonLoading"
              @click="handleDeleteClick(item)"
            >
              Delete
            </Button>
          </slot>
        </template>
      </v-data-table-server>
    </div>
  </v-card>

  <modal-field
    v-model="deleteDialog"
    title="Delete Confirmation"
    show-default-actions
    persistent
    :cancel-button-text="'Cancel'"
    :confirm-button-text="'Delete'"
    confirm-button-color="error"
    @confirm="confirmDeleteAction"
  >
    Are you sure you want to delete this record?
  </modal-field>
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<string, string | number | boolean | Date | object | null | undefined>"
>
import { computed, ref } from 'vue'
import EmptyState from '@/common/EmptyState/index.vue'
import TableSkeleton from '@/common/Skeletons/table.skeleton.vue'
import Button from '@/common/Button/index.vue'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

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
  emptyStateTitle?: string
  emptyStateText?: string
  totalItems?: number
  page?: number
  buttonLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  limit: 5,
  search: '',
  showViewButton: true,
  showEditButton: true,
  showDeleteButton: true,
  emptyStateTitle: 'No Data Available',
  emptyStateText: 'There are no records to display at the moment.',
  totalItems: 0,
  page: 1,
  buttonLoading: false,
})

const deleteDialog = ref(false)
const itemToDelete = ref<T | null>(null)
const errorMessage = ref<string | null>(null)

const emit = defineEmits<{
  view: [item: T]
  edit: [item: T]
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
  itemToDelete.value = item
  deleteDialog.value = true
}

const confirmDeleteAction = () => {
  if (itemToDelete.value) {
    emit('deleteConfirmed', itemToDelete.value)
    deleteDialog.value = false
    itemToDelete.value = null
  }
}

const handleDeleteSuccess = () => {
  if (props.items.length === 1 && props.page > 1) {
    emit('update:page', props.page - 1)
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
    snackbarStore.showError(message)
    errorMessage.value = message
  },
  showSuccess: (message: string) => {
    snackbarStore.showSuccess(message)
  },
  handleDeleteSuccess,
  handleDeleteClick,
})
</script>

<style scoped lang="scss">
.empty-value {
  color: #999;
  font-style: italic;
}
</style>
