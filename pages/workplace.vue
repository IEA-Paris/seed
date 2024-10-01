<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="d-flex align-center justify-center flex-column"
        >
        <div class="text-h3">{{ $t('visit') }}</div>
        <ContentDoc :path="content" />
        </v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const { locale, locales } = useI18n()
const content = ref("/pages/" + locale.value + "/workplace")

</script>