<template>
  <div class="d-flex align-center justify-center">
    <div class="dateStamp">
      <div class="text-h4 pt-0">
        {{ date[0].getDay() }}
      </div>

      <div
        class="text-overline font-weight-bold text-left"
        style="line-height: 1rem"
      >
        {{ date[0].toLocaleString($i18n.locale, { month: "long" }) }}
      </div>
      <div
        class="text-overline font-weight-bold text-left"
        style="line-height: 1rem"
      >
        {{ date[0].getFullYear() }}
      </div>
    </div>

    <template v-if="isDouble">
      <v-icon>mdi-chevron-right</v-icon>
      <div class="dateStamp">
        <div class="text-h4 pt-0">
          {{ date[1].getDay() }}
        </div>
        <div
          class="text-overline font-weight-bold text-right"
          style="line-height: 1rem"
        >
          {{ date[1].toLocaleString($i18n.locale, { month: "long" }) }}
        </div>
        <div
          class="text-overline font-weight-bold text-left"
          style="line-height: 1rem"
        >
          {{ date[1].getFullYear() }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
const props = defineProps({
  date: {
    type: Array,
    required: true,
  },
})
const isDouble = computed(() => {
  return (
    props.date.length > 1 && props.date[1].getDay() !== props.date[0].getDay()
  )
})
</script>
<style lang="scss">
.dateStamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-weight: 500;
  text-align: center;
  .text-h4 {
    font-size: 2rem;
  }
  .text-overline {
    font-size: 0.75rem;
  }
  v-icon {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    .text-h4 {
      font-size: 1.5rem;
    }
    .text-overline {
      font-size: 0.5rem;
    }
  }
}
</style>
