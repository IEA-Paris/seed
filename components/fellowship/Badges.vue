<template>
  <div class="text-overline" v-if="registrationStatus === 0">
    {{
      $t("opening-applications-on-0", [getLocalizedDate(item.applicationStart)])
    }}
  </div>

  <FellowshipRegisterModal
    :item="item"
    v-else-if="registrationStatus === 1"
    class="mr-2"
  ></FellowshipRegisterModal>

  <v-btn
    color="grey-lighten-3"
    flat
    rounded="0"
    size="small"
    class="my-2"
    v-else-if="registrationStatus === 2"
  >
    <template v-slot:append>
      <v-icon class="text-grey" size="x-large"> mdi-circle-medium</v-icon>
    </template>
    {{
      $t("applications-closed-since-0", [
        getLocalizedDate(item.applicationStop),
      ])
    }}
  </v-btn>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { locale, locales } = useI18n()
const { $i18n } = useNuxtApp()

const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
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
