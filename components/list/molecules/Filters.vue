<template>
  <v-row>
    <template v-for="filterItem in Object.keys(rootStore[type].list.filters)">
      <v-col cols="12" sm="6" md="4" v-if="computeVisibility(filterItem)">
        <component
          tile
          :is="ComponentName(filterItem)"
          :name="filterItem"
          hide-details
          :filter="true"
          :dense="smAndDown"
          :items="getItems(filterItem)"
          clearable
          :label="$t(filterItem)"
          min-height="56"
          variant="outlined"
          :loading="rootStore[type].loading"
          :type="type"
          color="black"
          style="min-width: 150px"
          class="transition-swing pb-1"
        />
        <!--    <template
      v-else
      v-for="filterItem in Object.keys(rootStore[type].list.filters).slice()"
    >
      <div v-if="computeVisibility(filterItem)">
        {{ filterItem }}
      </div>
    </template> -->
      </v-col>
    </template></v-row
  >
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
const { smAndDown, mdAndUp } = useDisplay()
const i18n = useI18n()
const localePath = useLocalePath()
const { locale, locales, messages } = useI18n()

const rootStore = useRootStore()
const props = defineProps(["type", "expanded"])
console.log("props.type: ", props.type)

const ComponentName = (name) => {
  return resolveComponent(
    "FormAtoms" + capitalize(rootStore[props.type].list.filters[name].type),
  )
}
const getItems = (name) => {
  if (rootStore[props.type].list.filters[name].type === "Checkbox") {
    return []
  }
  return Object.keys(
    messages.value[locale.value].list.filters[props.type][name],
  ).map((item) => ({
    title: i18n.t(`list.filters.${props.type}.${name}.${item}`),
    value: item,
  }))
}
onMounted(() => {
  rootStore.loadRouteQuery(props.type)
})

const computeVisibility = (filterItem) => {
  console.log("filterItem: ", filterItem)
  /* console.log(Object.keys(rootStore[props.type].list.filters))
  console.log("filter: ", props.name)
  console.log(
    "!rootStore[props.type].list.filters[props.name].visibility: ",
    !rootStore[props.type].list.filters[props.name].visibility,
  )
  console.log(
    " rootStore[props.type].list.filters[props.name].visibility?.default: ",
    rootStore[props.type].list.filters[props.name].visibility?.default,
  )
  return (
    !rootStore[props.type].list.filters[props.name].visibility ||
    rootStore[props.type].list.filters[props.name].visibility?.default ||
    rootStore[props.type].list.filters[props.name].visibility?.switchIf.find(
      (rule) => {
        console.log("rule: ", rule)
        return Object.keys(rule).find((value, index, obj) => {
          console.log("value: ", value)
          console.log(
            "rootStore[props.type].list.filters[value].value: ",
            rootStore[props.type].list.filters[value],
          )
          console.log("rule[value]: ", rule[value])
          console.log(
            "rootStore[props.type].list.filters[props.name]: ",
            rootStore[props.type].list.filters[props.name],
          )
          console.log(
            "Array.isArray(rootStore[props.type].list.filters[props.name]): ",
            Array.isArray(rootStore[props.type].list.filters[props.name]),
          )
          console.log(
            "rootStore[props.type].list.filters[props.name]?.value",
            rootStore[props.type].list.filters[props.name]?.value,
          )
          return Array.isArray(rootStore[props.type].list.filters[props.name])
            ? rootStore[props.type].list.filters[props.name]?.value.includes(
                rule[value],
              ) || false
            : rootStore[props.type].list.filters[props.name]?.value ===
                rule[value] || false
        })
      },
    )
  ) */
  return true
}
/* const filterValue = computed({
  get(name) {
    console.log("name: ", name)
    return rootStore[props.type].list.filters[name].value
  },
  set(name, value) {
    console.log("name, value: ", name, value)
    rootStore.updateFilter({
      type: props.type,
      filter: name,
      value: value,
    })
  },
}) */
</script>

<style lang="scss" scoped></style>
