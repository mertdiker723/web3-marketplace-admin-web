<template>
  <div :class="containerClass">
    <label v-if="label" :for="id">{{ label }}</label>
    <v-text-field
      :id="id"
      :label="placeholder"
      :type="type"
      :variant="variant"
      :placeholder="placeholder"
      :prepend-inner-icon="prependInnerIcon"
      :density="density"
      :class="inputClass"
      :autocomplete="autocomplete"
      name="new-unique-name"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  id?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'file' | 'textarea'
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
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
