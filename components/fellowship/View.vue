<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img block :src="item.picture" height="250px"></v-img>
          <v-card-text class="my-6">{{ item.description }}</v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="d-flex flex-column justify-center" link>
            <v-expansion-panels eager ripple accordion>
              <v-expansion-panel
                v-for="item in Object.keys(item.details)"
                :key="i"
                :title="$t(item)"
                style="white-space: pre"
                :text="item.details[item]"
              >
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import getFileIcon from "~/composables/useIcons"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const localePath = useLocalePath()
const router = useRouter()
const { locale } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
onMounted(() => {
  console.log("fellowship item", props.item.value)
})
</script>

<style lang="scss" scoped></style>
