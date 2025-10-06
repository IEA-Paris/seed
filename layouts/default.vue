import { nextTick } from 'vue';
<template>
  <v-app>
    <NuxtLoadingIndicator color="black" />
    <NavigationTopBar />
    <v-main>
      <NavigationBreadcrumbs></NavigationBreadcrumbs>
      <v-container class="main-container">
        <slot />
      </v-container>
      <NavigationLoader :active="$rootStore.loading || loading" />
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

nuxtApp.hook("page:finish", async () => {
  /*   setTimeout(() => { */
  await nextTick()
  nextTick(() => {
    loading.value = false
  })
  // }, 600) // Adjust timing as needed
})
</script>
