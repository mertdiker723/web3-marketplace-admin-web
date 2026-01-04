<template>
  <v-card-title v-if="title">
    <h2>{{ title }}</h2>
  </v-card-title>
  <v-card-text>
    <v-skeleton-loader type="table-tbody" />
  </v-card-text>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
