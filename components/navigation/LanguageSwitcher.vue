<template>
  <v-menu offset-y bottom>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="h-100" x-large>
        {{ $i18n.locale.toUpperCase() }}
        <v-icon right>{{
          props["aria-expanded"] === "true"
            ? "mdi-chevron-down"
            : "mdi-chevron-up"
        }}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="loc in availableLocales"
        :key="loc.code"
        @click="switchLocale(loc.code)"
      >
        <v-list-item-title class="text-uppercase text-button">
          {{ loc.name.toLowerCase() }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
const { locale, locales, setLocale } = useI18n()
const router = useRouter()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

async function switchLocale(code) {
  // Resolve the equivalent path in the target locale (preserves params).
  const target = switchLocalePath(code)
  const scrollY = typeof window !== "undefined" ? window.scrollY : 0

  await setLocale(code)

  // Re-attach the current query and hash, which switchLocalePath drops.
  if (target) {
    await router.push({
      path: target,
      query: route.query,
      hash: route.hash,
    })
  }

  // Restore the previous scroll position so the user stays where they were.
  if (typeof window !== "undefined") {
    await nextTick()
    window.scrollTo({ top: scrollY, behavior: "instant" })
  }
}
</script>
<style lang="scss"></style>
