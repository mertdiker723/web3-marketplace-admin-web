<template>
  <v-snackbar
    v-model="isVisible"
    :color="color"
    :timeout="timeout"
    :location="location"
    :multi-line="multiLine"
  >
    <div class="snackbar-content">
      <v-icon v-if="icon" :icon="icon" class="mr-2" />
      <span>{{ message }}</span>
    </div>

    <template v-slot:actions>
      <v-btn v-if="closeable" variant="text" @click="close">
        {{ closeText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type SnackbarColor = 'success' | 'error' | 'warning' | 'info'
type SnackbarLocation =
  | 'top'
  | 'top right'
  | 'top left'
  | 'bottom'
  | 'bottom right'
  | 'bottom left'
  | 'left'
  | 'right'

interface Props {
  modelValue: boolean
  message: string
  color?: SnackbarColor
  timeout?: number
  location?: SnackbarLocation
  icon?: string
  closeable?: boolean
  closeText?: string
  multiLine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'info',
  timeout: 1500,
  location: 'top right',
  closeable: false,
  closeText: 'Close',
  multiLine: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isVisible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal
  },
)

watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const close = () => {
  isVisible.value = false
}
</script>

<style scoped lang="scss">
.snackbar-content {
  display: flex;
  align-items: center;
}
</style>
