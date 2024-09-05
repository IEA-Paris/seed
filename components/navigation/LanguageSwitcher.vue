<template>
  <v-menu offset-y bottom>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="h-100" x-large>
        {{ $i18n.locale.toUpperCase() }}
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="
          $i18n.setLocale(locale.code) &&
            $router.push(localePath($route.fullPath))
        "
      >
        <v-list-item-title class="text-uppercase text-button">
          {{ locale.name.toLowerCase() }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
console.log("availableLocales: ", availableLocales.value)
</script>
<style lang="scss"></style>
