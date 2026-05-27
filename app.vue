<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const { $i18n } = useNuxtApp()
useHead({
  // as a string,
  // where `%s` is replaced with the title
  // of the current page
  title: "Welcome ",
  titleTemplate: `%s - ${$i18n.t("paris_ias")}`,
  htmlAttrs: {
    lang: "en",
  },
})
</script>
