<template>
  <v-btn
    v-bind="$attrs"
    :type="type"
    :block="block"
    :color="color"
    :size="size"
    :variant="variant"
    :disabled="disabled"
    :loading="loading"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :icon="icon"
    :class="btnClass"
    @click="handleClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  color?: string
  size?: string
  variant?: 'flat' | 'text' | 'elevated' | 'outlined' | 'plain' | 'tonal'
  disabled?: boolean
  loading?: boolean
  prependIcon?: string
  appendIcon?: string
  btnClass?: string
  icon?: boolean | string
}>()

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
