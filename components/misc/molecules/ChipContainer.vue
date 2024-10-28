<template>
  <div class="d-flex flex-row flex-wrap" v-bind="attrs">
    <div v-for="(tag, index) in items" :key="tag + index" class="">
      <v-chip
        :size="
          ['small', 'small', 'small', 'default', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
        class="mr-2 mt-2"
        variant="outlined"
        label
        >{{ $t(tag.name) }}</v-chip
      >
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from "vue"
const attrs = useAttrs()

import { useDisplay } from "vuetify"
const { name, md, xl, lg, smAndDown, mdAndUp } = useDisplay()

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
