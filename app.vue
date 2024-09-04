<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
const { $i18n } = useNuxtApp();
const config = useAppConfig();
const route = useRoute();
useHead({
  // as a string,
  // where `%s` is replaced with the title
  // of the current page
  title: "Welcome ",
  titleTemplate: `%s - ${$i18n.t(config.name)}`,
});
</script>
