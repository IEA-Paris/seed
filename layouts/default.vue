<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <slot />
      </v-container>
      <!--   <section v-if="isSnapRoutes()" style="background-color:black">
        <NavigationFooter></NavigationFooter>
      </section> -->
      <NavigationFooter />
    </v-main>
  </v-app>
</template>

<script setup></script>
<style lang="scss" scoped></style>
