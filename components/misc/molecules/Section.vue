<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ title }}</h2>
    </div>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ContentRenderer v-if="content" :value="content" />
      </v-col>
    </v-row>
    <ListOrganismsList
      v-if="type"
      :type="type"
      :path-prefix="pathPrefix"
      :modifier="modifier"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  markdownFile: { type: String, required: true },
  type: { type: [String, Boolean], required: true },
  pathPrefix: { type: String, required: true },
  modifier: { type: String, default: undefined },
})

const { locale } = useI18n()
const contentPath = computed(
  () => `/pages/${locale.value}/${props.markdownFile}`,
)
const { data: content } = await useAsyncData(
  () => `pages-${props.markdownFile}-${locale.value}`,
  () => queryContent(contentPath.value).findOne(),
  { watch: [locale] },
)
</script>
