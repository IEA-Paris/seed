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
  </v-app>
  <NavigationLoader :active="$rootStore.loading" />
</template>
