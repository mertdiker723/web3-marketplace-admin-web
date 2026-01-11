<template>
  <v-container class="profile-container">
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader type="heading" class="mb-4" />
      </v-col>
    </v-row>
    <v-row>
      <!-- First Name -->
      <v-col cols="12" sm="6">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Last Name -->
      <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Email -->
      <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Phone -->
      <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Password -->
      <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Confirm Password -->
      <v-col cols="12" sm="6" class="mt-2 mt-sm-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Province -->
      <v-col cols="12" md="6" class="pt-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- District -->
      <v-col cols="12" md="6" class="pt-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Neighborhood -->
      <v-col cols="12" md="6" class="pt-0">
        <v-skeleton-loader type="text" />
      </v-col>
      <!-- Open Address -->
      <v-col cols="12" class="pt-0">
        <v-skeleton-loader type="paragraph" />
      </v-col>
      <!-- Submit Button -->
      <v-col cols="12">
        <v-skeleton-loader type="button" class="mt-2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Profile skeleton loader component
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 16px;
}
</style>
