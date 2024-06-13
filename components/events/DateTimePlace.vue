<template>
  <div class="text-overline font-weight-bold">
    {{ $t("date-et-heure") }}
  </div>
  <div>
    <div>{{ startDay }}</div>
    <div>{{ startTime }} - {{ stopTime }}</div>
  </div>

  <div class="text-overline font-weight-bold mt-md-4">
    {{ $t("location") }}
  </div>
  <div>
    {{ startDay }}
  </div>
  <div>{{ item.location }}</div>

  <div>
    <v-icon class="text-blue-accent-4">mdi-chevron-double-right </v-icon>
    <nuxt-link to="/"> {{ $t("details") }} </nuxt-link>
  </div>
</template>

<script setup>
import { getDetailedFormatedDate } from "~/composables/useUtils"
const { $i18n } = useNuxtApp()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const detailedStart = getDetailedFormatedDate(
  props.item.start,
  $i18n.locale.value
)
const startDay = ref(
  `${detailedStart.day} ${detailedStart.month} ${detailedStart.year}`
)
const startTime = ref(detailedStart.hours)
const detailedStop = getDetailedFormatedDate(
  props.item.stop,
  $i18n.locale.value
)
const stopTime = ref(detailedStop.hours)
</script>

<style lang="scss" scoped></style>
