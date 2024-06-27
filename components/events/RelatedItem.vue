<template>
  <v-card class="mx-auto" max-width="450">
    <v-toolbar>
      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list :items="values" lines="three" item-props>
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  </v-card>
</template>

<script setup>
const props = defineProps({ item: { type: Object, required: true } })

const values = ref([
  { type: "subheader", title: "Today" },
  {
    prependAvatar: props.item.image,
    title: props.item.name,
    subtitle: props.item.description,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: props.item.image,
    title: props.item.name,
    subtitle: props.item.description,
  },
])
</script>
