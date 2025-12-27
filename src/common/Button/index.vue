<template>
  <v-btn
    :block="block"
    :color="color"
    :size="size"
    :variant="variant"
    :disabled="disabled"
    :loading="loading"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :class="btnClass"
    @click="handleClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  block?: boolean
  color?: string
  size?: string
  variant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'plain' | 'tonal'
  disabled?: boolean
  loading?: boolean
  prependIcon?: string
  appendIcon?: string
  btnClass?: string
}>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>
