<template>
  <v-app>
    <NuxtLoadingIndicator color="black" />
    <ListOrganismsLoader :active="loading" />
    <v-main>
      <NavigationTopBar />
      <v-container fluid class="pa-0"> <slot /> </v-container>
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
<style lang="scss"></style>
