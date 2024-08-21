<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div
                class="text-h2 my-12 d-flex"
                v-motion-slide-visible-once-bottom
              >
                <slot></slot>
                <v-spacer></v-spacer>
                <div class="text-h6 font-weight-black d-flex align-center mr-6">
                  {{ model + 1 }}/{{
                    rootStore[props.type].list.items.length || 0
                  }}
                </div>
                <v-btn
                  size="large"
                  flat
                  :disabled="model === 0"
                  icon="mdi-chevron-left"
                  @click="model--"
                ></v-btn>
                <v-btn
                  size="large"
                  :disabled="
                    model === rootStore[props.type].list.items.length - 1
                  "
                  flat
                  icon="mdi-chevron-right"
                  @click="model++"
                ></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-slide-group
          v-model="model"
          :center-active="true"
          next-icon=""
          prev-icon=""
          ref="slideGroup"
          mobile-breakpoint="sm"
        >
          <v-slide-group-item
            v-for="(item, index) in rootStore[props.type].list.items"
            :key="n"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            <component
              :is="capitalize(props.type) + 'SlidingItem'"
              :index="index"
              :item="item"
              :width="computedWidth"
            />
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { capitalize } from "~/composables/useUtils"
const { $i18n } = useNuxtApp()
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const model = ref(0)
const slideGroup = ref()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await rootStore.update(props.type, $i18n.locale.value)
})

useFetch(async () => {
  await rootStore.update(props.type, $i18n.locale.value)
})
const computedWidth = computed(() => {
  return ["200", "250", "350", "400", "450", "500"][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
})
</script>
