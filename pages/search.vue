<template>
  <v-container>
    <ListAtomsSearchInput
      type="all"
      :placeholder="$t('search')"
      variant="outlined"
    />
    <v-btn-toggle
      v-model="categories"
      multiple
      divided
      variant="text"
      tile
      color="black"
      mandatory
    >
      <v-btn
        class=""
        :prepend-icon="
          categories.includes(0)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.people", 2) }}
      </v-btn>

      <v-btn
        class=""
        :prepend-icon="
          categories.includes(1)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.events", 2) }}
      </v-btn>

      <v-btn
        class=""
        :prepend-icon="
          categories.includes(2)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.news", 2) }}
      </v-btn>

      <v-btn
        class=""
        :prepend-icon="
          categories.includes(3)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.publications", 2) }}
      </v-btn>
      <v-btn
        class=""
        :prepend-icon="
          categories.includes(4)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.fellowships", 2) }}
      </v-btn>
      <v-btn
        class=""
        :prepend-icon="
          categories.includes(5)
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
      >
        {{ $t("items.projects", 2) }}
      </v-btn>
    </v-btn-toggle>
    <ListOrganismsResults type="people" v-if="categories.includes(0)" />
    <ListOrganismsResults type="events" v-if="categories.includes(1)" />
    <ListOrganismsResults type="news" v-if="categories.includes(2)" />
    <ListOrganismsResults type="publications" v-if="categories.includes(3)" />
    <ListOrganismsResults type="fellowships" v-if="categories.includes(4)" />
    <ListOrganismsResults type="projects" v-if="categories.includes(5)" />
  </v-container>
</template>
<script setup lang="ts">
const categories = ref<number[]>([0, 1, 2, 3, 4, 5])
</script>
<style lang="scss"></style>
