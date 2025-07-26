<template>
  <v-app>
    <NuxtLoadingIndicator color="black" />
    <NavigationTopBar />
    <v-main>
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <slot />
      </v-container>
      <NavigationFooter />
    </v-main>
    <NavigationLoader v-if="$rootStore.loading" :active="$rootStore.loading" />
  </v-app>
</template>

<script setup></script>
<style lang="scss" scoped></style>
