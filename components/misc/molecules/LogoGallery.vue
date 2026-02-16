<template>
  <!-- Skeleton loading state -->
  <div v-if="props.loading" class="logo-container">
    <v-row dense>
      <v-col v-for="n in 6" :key="n" cols="4" sm="3" md="2">
        <v-skeleton-loader type="image" class="logo-skeleton" />
      </v-col>
    </v-row>
  </div>

  <!-- Logo marquee gallery -->
  <div v-else-if="items?.length" class="logo-container">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="marquee-track"
      :class="{ 'marquee-reverse': rowIndex % 2 === 1 }"
    >
      <div class="marquee-content">
        <template v-for="(item, i) in row" :key="`a-${i}`">
          <v-menu
            open-on-hover
            :open-delay="300"
            :close-delay="200"
            location="top"
            content-class="logo-hover-card"
          >
            <template #activator="{ props: menu }">
              <a
                v-bind="menu"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="logo-item"
                :style="{ '--hover-bg': item.color || '#fff' }"
              >
                <v-img
                  :src="item.picture"
                  :alt="item.name"
                  contain
                  class="logo-img"
                />
              </a>
            </template>
            <MiscMoleculesLogoHoverCard :item="item" />
          </v-menu>
        </template>
        <!-- Duplicate for seamless loop -->
        <template v-for="(item, i) in row" :key="`b-${i}`">
          <v-menu
            open-on-hover
            :open-delay="300"
            :close-delay="200"
            location="top"
            content-class="logo-hover-card"
          >
            <template #activator="{ props: menu }">
              <a
                v-bind="menu"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="logo-item"
                :style="{ '--hover-bg': item.color || '#fff' }"
                aria-hidden="true"
              >
                <v-img
                  :src="item.picture"
                  :alt="item.name"
                  contain
                  class="logo-img"
                />
              </a>
            </template>
            <MiscMoleculesLogoHoverCard :item />
          </v-menu>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

const rowCount = 3

// Deterministic split into rows (same order on server & client)
function splitRows(list) {
  if (!list?.length) return []
  const size = Math.ceil(list.length / rowCount)
  return Array.from({ length: rowCount }, (_, i) =>
    list.slice(i * size, i * size + size),
  ).filter((row) => row.length > 0)
}

// Fisher-Yates shuffle (in-place)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const rows = ref(splitRows(props.items))

// Shuffle only on the client after hydration to avoid SSR mismatch
onMounted(() => {
  rows.value = splitRows(shuffle([...props.items]))
})

watch(
  () => props.items,
  (val) => {
    rows.value = splitRows(import.meta.server ? val : shuffle([...val]))
  },
)
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  overflow: hidden;
  padding: 0.5em 0;
}

.logo-skeleton {
  height: 100px;
}

/* Marquee track */
.marquee-track {
  overflow: hidden;
  width: 100%;
  margin-bottom: 4px;
}

.marquee-content {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;

  .marquee-reverse & {
    animation-direction: reverse;
  }
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 150px;
  height: 100px;
  padding: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: transparent;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: var(--hover-bg, #fff);

    .logo-img {
      filter: none;
    }
  }
}

.logo-img {
  max-width: 100%;
  max-height: 100%;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Pause on hover for accessibility */
.marquee-track:hover .marquee-content {
  animation-play-state: paused;
}
</style>

<style>
.logo-hover-card {
  pointer-events: auto;
  max-height: 100vh;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.hover-card-root {
  max-height: 100vh;
  overflow-y: auto;
  background-color: #fff !important;
}

.description-scroll {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
  padding-right: 4px;
}
</style>
