<template>
  <v-sheet class="d-flex sliding-item" :color="dark ? 'transparent' : 'white'">
    <div class="d-flex-flex-column flex-grow-1">
      <MiscAtomsImageContainer
        cover
        :ratio="1"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :loading="loading"
      />
      <div
        class="mt-6 pl-0 text-h5 text-md-h4 font-weight-medium sliding-item-title"
        :style="{ color: dark ? 'white' : 'black' }"
      >
        {{ item.firstname + " " + item.lastname }}
      </div>
    </div>
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: true },
  dark: { type: Boolean, default: false },
})
</script>
<style lang="scss"></style>
