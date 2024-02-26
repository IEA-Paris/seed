<template>
  <h1>
    <div
      v-for="(word, index) in moto.split('.')"
      :key="index"
      v-motion
      :initial="{
        opacity: 0,
      }"
      :enter="{
        opacity: 1,
        transition: {
          type: 'fade',
          delay: index * 100,
        },
      }"
    >
      {{ word + "." }}
    </div>
  </h1>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
const { $i18n } = useNuxtApp()
const { data: rst } = await useAsyncData("moto", () =>
  queryContent("/pages/" + $i18n.locale.value + "/moto").findOne()
)
console.log("rst: ", rst.value)
const moto = ref(rst.value.description)
</script>
<style lang="scss" scoped>
h1 {
  font-family: "Montserrat Medium";
  max-width: 40ch;
  text-align: center;
}
div {
  display: inline-block;
}
</style>
