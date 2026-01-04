<template>
  <div class="empty-state">
    <v-icon :size="iconSize" :color="iconColor">{{ icon }}</v-icon>
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  iconSize?: number | string
  iconColor?: string
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-inbox-outline',
  iconSize: 64,
  iconColor: 'grey-lighten-1',
  title: 'No Data Available',
  description: 'There are no records to display at the moment.',
})
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  h3 {
    margin-top: 16px;
    font-size: 1.25rem;
    font-weight: 500;
    color: #424242;
  }

  p {
    margin-top: 8px;
    font-size: 0.875rem;
    color: #757575;
    max-width: 400px;
    line-height: 1.5;
  }
}
</style>
