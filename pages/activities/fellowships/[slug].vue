<template>
  <section style="background-color: white">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img block :src="data.picture" height="250px"></v-img>
          <v-card-text class="my-6">{{ data.description }}</v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="d-flex flex-column justify-center" link>
            <v-expansion-panels eager ripple accordion>
              <v-expansion-panel
                v-for="item in Object.keys(data.details)"
                :key="i"
                :title="$t(item)"
                style="white-space: pre"
                :text="data.details[item]"
              >
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup async>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const route = useRoute()
const { smAndUp } = useDisplay()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  "fellowship",
  async () =>
    await queryContent(
      "fellowship/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)
rootStore.setLoading(false, "fellowship")
</script>
