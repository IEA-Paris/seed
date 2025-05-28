<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <NuxtLoadingIndicator color="black" />
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <slot />
      </v-container>
      <NavigationFooter />
    </v-main>
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
  </v-app>
  <NuxtLoadingIndicator color="black" />
</template>

<script setup></script>
<style lang="scss" scoped></style>
