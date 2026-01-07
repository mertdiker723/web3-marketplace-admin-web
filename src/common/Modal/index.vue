<template>
  <v-dialog
    v-model="internalModelValue"
    :max-width="maxWidth"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :scrollable="scrollable"
  >
    <v-card>
      <v-card-title v-if="title || $slots.title" class="d-flex align-center justify-space-between">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <v-btn
          v-if="showCloseButton"
          icon="mdi-close"
          variant="text"
          size="small"
          @click="handleClose"
        ></v-btn>
      </v-card-title>

      <v-divider v-if="showDivider"></v-divider>

      <v-card-text :class="contentClass">
        <slot></slot>
      </v-card-text>

      <v-divider v-if="showDivider && ($slots.actions || showDefaultActions)"></v-divider>

      <v-card-actions v-if="$slots.actions || showDefaultActions">
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn
            v-if="showCancelButton"
            :color="cancelButtonColor"
            :variant="cancelButtonVariant"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </v-btn>
          <v-btn
            v-if="showConfirmButton"
            :color="confirmButtonColor"
            :variant="confirmButtonVariant"
            :loading="loading"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  maxWidth?: number | string
  modelValue: boolean
  title?: string
  persistent?: boolean
  fullscreen?: boolean
  scrollable?: boolean
  showCloseButton?: boolean
  showDivider?: boolean
  showDefaultActions?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  cancelButtonColor?: string
  confirmButtonColor?: string
  cancelButtonVariant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'plain' | 'tonal'
  confirmButtonVariant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'plain' | 'tonal'
  loading?: boolean
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 600,
  persistent: false,
  fullscreen: false,
  scrollable: true,
  showCloseButton: true,
  showDivider: true,
  showDefaultActions: false,
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
  cancelButtonColor: 'grey',
  confirmButtonColor: 'primary',
  cancelButtonVariant: 'text',
  confirmButtonVariant: 'flat',
  loading: false,
  contentClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  cancel: []
  confirm: []
  close: []
}>()

const internalModelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleCancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>
