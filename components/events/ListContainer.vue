<template>
  <v-list item-props lines="three">
    <v-list-item
      v-for="(event, i) in events"
      :key="i"
      :value="event"
      :to="localePath('/events/' + slugify(event.title))"
    >
      <template v-slot:prepend>
        <v-avatar size="40">
          <nuxt-img
            width="40px"
            height="40px"
            :src="event.picture"
            v-if="event.picture"
          ></nuxt-img>
          <v-icon v-else>mdi-calendar</v-icon></v-avatar
        >
      </template>
      <v-list-item-title>
        <v-chip class="mr-2" color="primary" v-if="event.online">
          {{ $t("online") }}
        </v-chip>
        <i>{{ event.date_text }}</i> <br /><b>{{ `${event.title}` }}</b>
      </v-list-item-title>
      <v-list-item-subtitle v-text="event.summary"></v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script setup>
import slugify from "~/assets/utils/slugify"
const { $i18n } = useNuxtApp()
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
})
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
</script>
<style lang="scss"></style>
