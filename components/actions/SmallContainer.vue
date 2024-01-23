<template>
  <v-card
    class="mx-auto d-flex align-center justify-center flex-column"
    :color="action[0].color || 'white'"
  >
    <v-img
      class="w-100"
      v-if="action[0].picture"
      :src="action[0].picture"
      :aspect-ratio="1 / 1"
      cover
    ></v-img>
    <v-card-text class="pa-6">
      <div class="text-h6 text--primary">{{ action[0].title }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="action[0].link" class="ml-auto">
        {{ $t("learn-more") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
const props = defineProps({
  action: {
    type: Array,
    required: true,
  },
})
</script>
<style lang="scss"></style>
