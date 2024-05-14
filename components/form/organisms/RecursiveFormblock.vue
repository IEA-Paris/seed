<template>
  <teleport :to="level.length > 1 ? '#form' + levelAsString() : '#container'">
    <div :id="'form' + level.join()">
      <!--  Regular Field Form Block / primitive -->
      <template v-if="!input.items">
        level: {{ level }}
        <component
          v-if="ComputeInputVisibility(input)"
          :is="'FormAtoms' + input.type"
          :label="$t(input.label) || lastLevelItem"
          :readonly="saving"
          :args="{ ...input, key: lastLevelItem, type }"
          :hint="input.description || false"
          :rules="GenerateInputRules(input)"
          :level="level"
          :clearable="input.clearable || false"
        ></component>
      </template>
      <!--  Collection Form Block -->
      <template v-else-if="checkArray(input.items)">
        COLLECTION level: {{ level }}
        <component
          v-if="items && items.length > 0"
          :is="input.type"
          :item="input"
          :args="{ ...input, key: lastLevelItem, type }"
          :level="level"
        >
          <template
            v-for="(item, index) in items"
            :key="'form' + level.join() + index"
          >
            <FormOrganismsRecursiveFormblock
              v-for="(field, index2) in input.items"
              :key="'form' + level.join() + index2 + index"
              :input="field"
              :type="type"
              :level="[...level, index, field.key]"
              :saving="saving"
            >
              <!-- between each collection element -->
              <template v-if="index2 === input.items.length - 1">
                <div class="d-flex justify-end mb-3">
                  <v-btn
                    prepend-icon="mdi-delete"
                    @click="
                      rootStore.deleteFormItem({
                        key: lastLevelItem,
                        type: props.type,
                        level: [...props.level, index],
                      })
                    "
                    >{{ $t("delete") }}</v-btn
                  >
                  <template v-if="index === items.length - 1">
                    <v-btn
                      prepend-icon="mdi-plus"
                      @click="
                        rootStore.addFormItem({
                          key: lastLevelItem,
                          type: props.type,
                          level: props.level,
                        })
                      "
                      >{{ $t("add") }}</v-btn
                    ></template
                  >
                </div>
              </template>
            </FormOrganismsRecursiveFormblock>
          </template>
          <!-- at the end of the iteration -->
        </component>
      </template>
      <!--  Object Form Block -->
      <template v-else>
        OBJECT level: {{ level }}
        <component
          v-if="
            input.items &&
            Object.keys(input.items) &&
            Object.keys(input.items).length > 0
          "
          :key="index"
          :is="input.type"
          :item="input"
          :args="{ ...input, key, type }"
        >
          <RecursiveFormblock
            v-for="(field, key, index2) in input.items"
            :input="field"
            :type="type"
            :level="[...level, key]"
            :saving="saving"
          ></RecursiveFormblock>
        </component>
      </template>
    </div>
    <v-spacer></v-spacer> <slot></slot>
  </teleport>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
import { storeToRefs } from "pinia"
import { useRootStore } from "~/store/root"

import { ComputeInputVisibility, GenerateInputRules } from "@/composables/form"
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()>
// const localePath = useLocalePath()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: () => {
      return ""
    },
  },
  input: {
    type: Object,
    required: true,
    default: () => {
      return {}
    },
  },
  rootIndex: {
    type: Number,
    required: false,
    default: () => {
      return 0
    },
  },
  level: {
    type: Array,
    required: true,
  },
  saving: {
    type: Boolean,
    required: true,
  },
  collectionMode: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const items = rootStore.getKey({
  key: props.input.key,
  level: props.level,
  store: rootStore[props.type].form,
})

const checkArray = (item) => {
  console.log("item: ", item)
  return Array.isArray(item)
}
const lastLevelItem = ref(props.level.at(-1))
const levelAsString = () => {
  return props.level.length > 2 &&
    typeof props.level[props.level.length - 2] == "number"
    ? props.level.slice(0, -2).join("")
    : props.level.slice(0, -1).join("")
}
</script>
<style lang="scss"></style>
