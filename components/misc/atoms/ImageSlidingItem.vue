<template>
  <v-sheet class="pa-2 sliding-item">
    <MiscAtomsImageContainer
      cover
      :loading="loading"
      :src="item.url"
      :ratio="1 / 1"
      :name="caption"
    />
    <div
      class="mt-3 pl-0 text-left text-h5 text-md-h4 font-weight-medium sliding-item-title"
    >
      {{ item.caption }}
    </div>
  </v-sheet>
</template>
<script setup>
const localePath = useLocalePath()
const props = defineProps({
  item: Object,
  loading: Boolean,
})
</script>
<style lang="scss"></style>
