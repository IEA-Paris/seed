<template>
  <v-select
    v-model="val"
    :items="props.items"
    :multiple="
      filter
        ? rootStore[type].list.filters[name]?.multiple || false
        : rootStore[type].form[keyVal].multiple
    "
  ></v-select>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { debounce } from "~/composables/debounce"
const rootStore = useRootStore()
const props = defineProps(["type", "keyVal", "items", "filter", "name"])
const val = computed({
  get() {
    return props.filter
      ? rootStore[props.type].list.filters[props.name]?.value || []
      : rootStore[props.type].form[props.keyVal]
  },
  set(value) {
    props.filter
      ? rootStore.updateFilter(props.name, value, props.type)
      : rootStore.updateForm({ key: props.keyVal, value, type: props.type })
  },
})
onMounted(() => {
  console.log(props)
})
</script>
<style lang="scss"></style>
