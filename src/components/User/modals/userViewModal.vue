<template>
  <Modal v-model="internalModelValue" title="User Details">
    <div v-if="user" class="user-details">
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <strong>User Type:</strong>
            <v-chip color="primary" class="ml-2" size="small">{{ user.userTypes?.name }}</v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>First Name:</strong>
            <span>{{ user.firstName }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Last Name:</strong>
            <span>{{ user.lastName }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Email:</strong>
            <span>{{ user.email }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Phone:</strong>
            <span>{{ user.phone || '-' }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Province:</strong>
            <span>{{ user.provinces?.name || '-' }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>City:</strong>
            <span>{{ user.districts?.name || '-' }}</span>
          </div>
        </v-col>
        <v-col>
          <div class="detail-item">
            <strong>Neighborhoods:</strong>
            <span>{{ user.neighborhoods?.name || '-' }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Open Address:</strong>
            <span>{{ user.openAddress || '-' }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Created At:</strong>
            <span>{{ user.createdAt ? formatDate(user.createdAt) : '-' }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="detail-item">
            <strong>Updated At:</strong>
            <span>{{ user.updatedAt ? formatDate(user.updatedAt) : '-' }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IUser } from '@/types/user/user.model'
import Modal from '@/common/Modal/index.vue'
import { formatDate } from '@/utils/helperFunctions'

interface Props {
  modelValue: boolean
  user: IUser | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const internalModelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<style scoped>
.user-details {
  padding: 16px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.detail-item strong {
  color: #666;
  font-size: 14px;
  font-weight: 600;
}

.detail-item span {
  color: #333;
  font-size: 16px;
}
</style>
