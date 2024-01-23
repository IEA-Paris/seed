<template>
  <v-expansion-panels
    v-if="
      $route.query &&
      $route.query.categories &&
      $route.query.categories.length > 1
    "
    v-model="JSON.parse($route.query.categories)[0]"
  >
    <v-expansion-panel
      elevation="0"
      :value="header"
      v-for="(header, index) in headers"
      :key="index"
    >
      <v-expansion-panel-text>
        <ContentDoc
          :path="'/pages/' + $i18n.locale + '/' + page + '_' + header"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const props = defineProps({
  page: {
    type: String,
    required: false,
    default: "",
  },
  headers: {
    type: Array,
    required: true,
  },
})
// const route = useRoute()
const localePath = useLocalePath()
</script>
