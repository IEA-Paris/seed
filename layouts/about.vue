<template>
  <v-app>
    <a href="#main-content" class="skip-link">{{ $t("skip-to-content") }}</a>
    <NuxtLoadingIndicator color="black" />
    <ListOrganismsLoader :active="loading" />
    <v-main>
      <NavigationTopBar />
      <v-container id="main-content" tabindex="-1" fluid class="pa-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const loading = ref(false)

const MIN_DISPLAY_MS = 1000
const DEBOUNCE_MS = 150
const POST_FINISH_MS = 100

let activateTimer = null
let startedAt = null

nuxtApp.hook("page:start", () => {
  clearTimeout(activateTimer)
  activateTimer = setTimeout(() => {
    loading.value = true
    startedAt = Date.now()
  }, DEBOUNCE_MS)
})

nuxtApp.hook("page:finish", () => {
  clearTimeout(activateTimer)
  if (!loading.value) return
  const elapsed = Date.now() - (startedAt ?? Date.now())
  const remaining = Math.max(POST_FINISH_MS, MIN_DISPLAY_MS - elapsed)
  setTimeout(() => {
    loading.value = false
    startedAt = null
  }, remaining)
})
</script>
<style lang="scss"></style>
