<template>
  <div>
    <PressroomHero />
    <PressroomKeyFacts />
    <PressroomMediaKit />
    <MiscMoleculesAnnualReports />
    <PressroomContact />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t("pressroom.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pressroom.meta.description"),
    },
  ],
})
</script>
