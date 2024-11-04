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
      class="mt-3 pl-0 text-left text-subtitle-2 font-weight-medium sliding-item-title"
    >
      {{ item.caption }}
    </div>
  </v-sheet>
</template>
<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: true },
})
</script>
<style lang="scss"></style>
