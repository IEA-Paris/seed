<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row class="mb-md-12" no-gutters>
            <v-col :class="mdAndUp ? 'text-h2' : 'text-h4'">
              <slot></slot>
            </v-col>
            <v-col
              class="text-h6 font-weight-black d-flex align-center"
              cols="1"
            >
              {{ model + 1 }}/{{ rootStore[props.type].list.items.length || 0 }}
            </v-col>

            <v-col cols="1" class="d-flex flex-row">
              <v-btn
                :size="mdAndUp ? 'large' : 'regular'"
                flat
                :disabled="model === 0"
                icon="mdi-chevron-left"
                @click="model--"
                class="swiper-button-prev"
              ></v-btn>
              <v-btn
                :size="mdAndUp ? 'large' : 'medium'"
                :disabled="
                  model === rootStore[props.type].list.items.length - 1
                "
                flat
                icon="mdi-chevron-right"
                @click="model++"
                class="swiper-button-next"
              ></v-btn>
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
          <template v-if="rootStore.loading || rootStore[props.type].loading">
            LOADING
          </template>
          <v-slide-group-item
            v-else
            v-for="(item, index) in rootStore[props.type].list.items"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            <component
              :key="index + props.type"
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
/* 
TODO: make it similar to radcliffe :
- offset out of the layout before scrolling. 
- Meaningful behavior when clicking on the arrrows
- Add a slide-in from right animation when the items are entering viewport 
*/
import { capitalize } from "~/composables/useUtils"
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const { locale } = useI18n()
const { name, mdAndUp } = useDisplay()
const rootStore = useRootStore()
const model = ref(0)
const slideGroup = ref()

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error: ", error)
}
/* const { data, error } = await useAsyncData(props.type, () =>
)
console.log("error: ", error) */
onMounted(async () => {})

const computedWidth = computed(() => {
  return ["200", "250", "300", "330", "400", "400"][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
})
</script>
