<template>
  <v-skeleton-loader
    v-if="rootStore.loading"
    max-width="120px"
    class="d-flex flex-row flex-md-column align-center align-md-end"
    :type="
      ['avatar', 'avatar', 'avatar', 'avatar', 'avatar', 'avatar'][
        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
      ]
    "
  >
  </v-skeleton-loader>
  <div
    v-else
    class="date-stamp d-flex flex-md-column text-md-right align-center align-md-end"
  >
    <span class="day"> {{ detailedDate.day }}</span>
    <span class="month-year">
      {{ detailedDate.month }}<br />
      {{ detailedDate.year }}
    </span>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
import { getDetailedFormatedDate } from "~/composables/useUtils"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

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
    font-family: "Bodoni Moda", sans-serif;
  }
  .month-year {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.2rem;
  }
}
</style>
