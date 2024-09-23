<template>
  <v-responsive :aspect-ratio="ratio">
  <!--     :color="action[0].color || 'default'" -->
    <v-card
      class="mx-auto d-flex align-center justify-center flex-column px-6"
      variant="flat"
    >
      <v-img
        class="w-100"
        v-if="action[0].picture"
        :src="action[0].picture"
        :aspect-ratio="1 / 1"
        cover
      ></v-img>
      <v-card-text class="px-0">
        <div class="text-h6">{{ action[0].title }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="action[0].link" class="ml-auto">
          {{ $t("learn-more") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
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
  ratio: {
    type: Number,
    required: true,
  },
})
</script>
<style lang="scss"></style>
