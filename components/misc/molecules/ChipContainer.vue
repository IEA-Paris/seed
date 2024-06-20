<template>
  <div class="d-flex flex-row flex-wrap mt-4">
    <div v-for="tag in items" :key="tag" class="mr-2 mt-2">
      <v-chip
        :size="
          ['small', 'small', 'default', 'default', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
        variant="outlined"
        label
        >{{ tag.name }}</v-chip
      >
    </div>
  </div>
</template>

<script setup>
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
