<template>
  <div class="text-overline" v-if="registrationStatus === 0">
    {{
      $t("opening-applications-on-0", [getLocalizedDate(item.applicationStart)])
    }}
  </div>

  <FellowshipRegisterModal
    :item="item"
    :view="view"
    v-else-if="registrationStatus === 1"
    class="mr-2"
  >
  </FellowshipRegisterModal>

  <div class="my-2 text-overline" v-else-if="registrationStatus === 2">
    <v-icon class="text-grey" size="x-large"> mdi-circle-medium</v-icon>
    {{
      $t("applications-closed-since-0", [
        getLocalizedDate(item.applicationStop),
      ])
    }}
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { locale, locales } = useI18n()
const { $i18n } = useNuxtApp()

const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
  view: { type: Boolean, required: false, default: false },
})

const registrationStatus = computed(() => {
  const currentDate = new Date()
  const startDate = new Date(props.item.applicationStart)
  const endDate = new Date(props.item.applicationStop)
  switch (true) {
    case currentDate < startDate:
      return 0
    case currentDate > startDate && currentDate < endDate:
      return 1
    case currentDate > startDate && currentDate > endDate:
      return 2
    default:
      return false
  }
})
</script>

<style lang="scss" scoped></style>
