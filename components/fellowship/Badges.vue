<template>
  <div v-if="registrationStatus">
    <FellowshipRegisterModal :item="item"></FellowshipRegisterModal>
    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      size="small"
      class="my-2 mx-4"
    >
      {{ $t("until") + " " + transformerDate(item.applicationStop) }}
    </v-btn>
  </div>

  <div v-else>
    <v-btn color="grey-lighten-3" flat rounded="0" size="small" class="my-2">
      <template v-slot:append>
        <v-icon class="text-green" size="x-large"> mdi-circle-medium</v-icon>
      </template>
      {{ $t("registration-close") }}
    </v-btn>
    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      size="small"
      class="my-2 mx-4"
    >
      {{ $t("since") + " " + transformerDate(item.applicationStop) }}
    </v-btn>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { locale, locales } = useI18n()
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
})

const registrationStatus = computed(() => {
  const currentDate = new Date()
  const startDate = new Date(props.item.applicationStart)
  const endDate = new Date(props.item.applicationStop)
  if (startDate <= currentDate && currentDate <= endDate) {
    return true
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return true
  } else if (currentDate > startDate && currentDate > endDate) {
    return false
  }
})

function transformerDate(dateIso) {
  const date = new Date(dateIso)
  const options = { year: "numeric", month: "long", day: "numeric" }
  // return new Intl.DateTimeFormat(this.$i18n.locale, options).format(date) //TODO: Voir avec Antoine
  // console.log("locale", locale)
  // console.log("locales", locales)
  return new Intl.DateTimeFormat("en-En", options).format(date)
}
</script>

<style lang="scss" scoped></style>
