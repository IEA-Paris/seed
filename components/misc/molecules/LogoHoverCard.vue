<template>
  <v-card
    variant="elevated"
    color="white"
    class="pa-3 hover-card-root"
    min-width="260"
    max-width="360"
  >
    <!-- Header: avatar + name + chip -->
    <div class="d-flex align-start ga-3">
      <v-avatar :color="item.color || '#f5f5f5'" rounded="sm" size="48">
        <v-img :src="item.picture" :alt="item.name" contain />
      </v-avatar>
      <div class="d-flex flex-column">
        <span class="font-weight-bold text-h6">{{ item.name }}</span>
        <v-chip
          v-if="item.category"
          size="x-small"
          variant="tonal"
          class="mt-1 align-self-start"
          :color="categoryColor"
        >
          {{ item.category }}
        </v-chip>
      </div>
    </div>

    <v-divider class="my-2" />

    <!-- Meta: location + url -->
    <div class="d-flex flex-column ga-1">
      <span v-if="item.location" class="text-caption d-flex align-center">
        <v-icon size="x-small" icon="mdi-map-marker" class="mr-1" />
        {{ item.location }}
      </span>
      <a
        v-if="item.url"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-caption d-flex align-center text-primary text-decoration-none ml-3"
        @click.stop
      >
        <v-icon size="x-small" icon="mdi-open-in-new" class="mr-1" />
        {{ displayUrl }}
      </a>
    </div>

    <!-- Summary / Description text -->
    <div v-if="item.summary || item.description" class="mt-2">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p
        class="text-body-2 text-medium-emphasis mb-0 ml-3"
        style="line-height: 1.4"
        v-html="expanded && hasMore ? item.description : item.summary"
      />
    </div>

    <!-- Expand / collapse toggle -->
    <div v-if="hasMore" class="mt-1 ml-3">
      <v-btn
        variant="text"
        size="x-small"
        color="primary"
        class="px-0 text-none"
        :append-icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click.prevent.stop="expanded = !expanded"
      >
        {{ expanded ? t("less") : t("more") }}
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
const { t } = useI18n()

const props = defineProps({
  item: { type: Object, required: true },
})

const expanded = ref(false)

const hasMore = computed(
  () =>
    !!props.item.description && props.item.description !== props.item.summary,
)

const categoryColor = computed(() => {
  const map = { MEMBER: "primary", PARTNER: "secondary", SPONSOR: "success" }
  return map[props.item.category] || "grey"
})

const displayUrl = computed(() => {
  try {
    return new URL(props.item.url).hostname.replace(/^www\./, "")
  } catch {
    return props.item.url
  }
})
</script>
