<template>
  <v-col cols="12" md="1">
    <div
      class="date-stamp d-flex flex-md-column text-md-right align-center align-md-end"
    >
      <span class="day"> {{ detailedDate.day }}</span>
      <span class="month-year">
        {{ detailedDate.month }}<br />
        {{ detailedDate.year }}
      </span>
    </div>
  </v-col>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
import { getDetailedFormatedDate } from "~/composables/useUtils"

const { $i18n } = useNuxtApp()
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
})

const detailedDate = ref(
  getDetailedFormatedDate(props.date, $i18n.locale.value)
)
</script>
<style lang="scss" scoped>
.date-stamp {
  font-family: "Open sans";
  .day {
    font-size: 2.6rem;
    line-height: 2.6rem;
  }
  .month-year {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.2rem;
  }
}
</style>
