<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="d-flex align-center justify-center flex-column py-9"
          flat
        >
          <h2>{{ $t("privacy-policy") }}</h2>
          <ContentDoc :path="content" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const { locale, locales } = useI18n()
const content = ref("/pages/" + locale.value + "/privacy_policy")
</script>
