<template>
  <div :class="containerClass">
    <label v-if="label" :for="id">{{ label }}</label>
    <v-select
      :id="id"
      :label="placeholder"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :variant="variant"
      :density="density"
      :placeholder="placeholder"
      :clearable="clearable"
      :chips="chips"
      :multiple="multiple"
      :class="selectClass"
      :error-messages="errorMessages"
      :model-value="modelValue"
      :disabled="disabled"
      :loading="loading"
      v-bind="$attrs"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

interface SelectItem {
  [key: string]: string | number | boolean | null | undefined
}

defineProps<{
  modelValue?: string | number | string[] | number[] | null
  label?: string
  id?: string
  items: (string | number | SelectItem)[]
  itemTitle?: string
  itemValue?: string
  variant?:
    | 'filled'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-filled'
    | 'solo-inverted'
    | 'underlined'
  density?: 'default' | 'comfortable' | 'compact'
  selectClass?: string
  containerClass?: string
  placeholder?: string
  clearable?: boolean
  chips?: boolean
  multiple?: boolean
  errorMessages?: string | string[]
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | string[] | number[] | null): void
}>()

const onUpdateModelValue = (value: string | number | string[] | number[] | null) => {
  emit('update:modelValue', value)
}
</script>
