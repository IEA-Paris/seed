<template>
  <v-app>
    <NuxtLoadingIndicator color="black" />
    <ListOrganismsLoader :active="loading" />
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
<script setup>
const nuxtApp = useNuxtApp()
const loading = ref(false)

nuxtApp.hook("page:start", () => {
  loading.value = true
})

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
