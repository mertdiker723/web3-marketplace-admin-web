<template>
  <div class="login-page">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="7" lg="5">
          <v-card class="pa-8" elevation="8" rounded="lg">
            <!-- Logo & Title -->
            <div class="text-center mb-8">
              <v-icon size="80" color="primary" class="mb-4">mdi-ethereum</v-icon>
              <h2 class="text-h4 font-weight-bold mb-2">Admin Panel</h2>
              <p class="text-h6 text-grey">Web3 Marketplace</p>
            </div>

            <v-form>
              <input-field
                type="email"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                placeholder="Email"
                autocomplete="off"
              />

              <input-field
                type="password"
                variant="outlined"
                density="comfortable"
                placeholder="Password"
              />

              <div class="d-flex justify-space-between align-center mb-6">
                <v-checkbox label="Remember me" hide-details />
                <a href="#" class="text-primary text-decoration-none text-body-1"
                  >Forgot Password?</a
                >
              </div>

              <v-btn block color="primary" size="x-large" class="mb-5 text-h6"> Sign In </v-btn>

              <div class="text-center">
                <span class="text-grey text-body-1">Don't have an account? </span>
                <a href="#" class="text-primary text-decoration-none font-weight-bold text-body-1">
                  Sign Up
                </a>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// Pure UI - No functionality
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #7c9aeb 100%);
}
</style>
