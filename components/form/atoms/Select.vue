<template>
  <v-select
    v-model="val"
    :items="props.items"
    :multiple="
      filter
        ? rootStore[type].list.filters[name]?.multiple || false
        : rootStore[type].form[key].multiple
    "
    v-if="computeVisibility"
  ></v-select>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { debounce } from "~/composables/debounce"
const rootStore = useRootStore()
const props = defineProps(["type", "key", "items", "filter", "name"])
const val = computed({
  get() {
    return props.filter
      ? rootStore[props.type].list.filters[props.name]?.value || []
      : rootStore[props.type].form[props.key]
  },
  set(value) {
    props.filter
      ? rootStore.updateFilter(props.name, value, props.type)
      : rootStore.updateForm({ key: props.key, value, type: props.type })
  },
})
const computeVisibility = computed(() => {
  console.log(Object.keys(rootStore[props.type].list.filters))
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
  )
})
onMounted(() => {
  console.log(props)
})
</script>
<style lang="scss"></style>
