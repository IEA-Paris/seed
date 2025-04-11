<template>
  <v-app>
    <NuxtLoadingIndicator color="black" />
    <NavigationTopBar />
    <v-main>
      <NuxtLoadingIndicator color="black" />
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <v-overlay
          :model-value="$rootStore.loading"
          class="align-center justify-center"
        >
          <v-progress-circular
            color="black"
            size="64"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
        <slot />
      </v-container>
      <NavigationFooter />
    </v-main>
  </v-app>
</template>

<script setup></script>
<style lang="scss" scoped></style>
