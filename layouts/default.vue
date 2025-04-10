<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <slot />
      </v-container>
      <NavigationFooter />
    </v-main>
  </v-app>
</template>

<script setup></script>
<style lang="scss" scoped></style>
