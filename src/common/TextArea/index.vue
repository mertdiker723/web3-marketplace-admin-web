<template>
  <div :class="containerClass">
    <label v-if="label" :for="id">{{ label }}</label>
    <v-textarea
      :id="id"
      :label="placeholder"
      :variant="variant"
      :placeholder="placeholder"
      :prepend-inner-icon="prependInnerIcon"
      :density="density"
      :class="inputClass"
      :autocomplete="autocomplete"
      :error-messages="errorMessages"
      :model-value="modelValue"
      v-bind="$attrs"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
defineProps<{
  modelValue?: string | number
  label?: string
  id?: string
  type: 'textarea'
  variant?:
    | 'filled'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-filled'
    | 'solo-inverted'
    | 'underlined'
  prependInnerIcon?: string
  density?: 'default' | 'comfortable' | 'compact'
  inputClass?: string
  containerClass?: string
  placeholder?: string
  autocomplete?: string
  errorMessages?: string | string[]
}>()

const emit = defineEmits(['update:modelValue'])

const onUpdateModelValue = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>
