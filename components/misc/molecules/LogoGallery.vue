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
  <div v-else-if="rows.length" class="logo-container">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="marquee-track"
      :class="{
        'marquee-reverse': rowIndex % 2 === 1,
        'marquee-track--featured': row.featured,
      }"
    >
      <div class="marquee-content">
        <!-- Two identical groups → seamless -50% loop. Each group is tiled
             enough times to overflow the track, so no empty gap appears. -->
        <div
          v-for="copy in 2"
          :key="`copy-${copy}`"
          class="marquee-group"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <v-menu
            v-for="(item, i) in row.items"
            :key="`${copy}-${i}`"
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
                :style="{ '--hover-bg': item.color || '#fff', '--rest-bg': item.color && !['#fff', '#ffffff', 'white'].includes(item.color.toLowerCase()) ? '#e0e0e0' : 'transparent' }"
              >
                <v-img
                  :src="item.picture"
                  :alt="item.name"
                  contain
                  eager
                  height="100%"
                  width="100%"
                  class="logo-img"
                />
              </a>
            </template>
            <MiscMoleculesLogoHoverCard :item="item" />
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Members — split across `rowCount` regular rows below the featured row.
  items: { type: Array, default: () => [] },
  // Supports — rendered as a single, larger featured first row.
  featuredItems: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  rowCount: { type: Number, default: 3 },
})

const rowCount = props.rowCount

// Minimum logos per row group so one group always overflows a wide track.
// A logo-item is ~200px wide; ~10 fills any realistic viewport, after which
// the duplicated group makes the -50% loop seamless with no empty gap.
const MIN_PER_ROW = 10

// Tile a row's items until it reaches at least MIN_PER_ROW, so short rows
// still fill the marquee track instead of leaving it ~empty.
function tile(list) {
  if (!list.length) return list
  const out = []
  while (out.length < MIN_PER_ROW) out.push(...list)
  return out
}

// Deterministic split of members into `rowCount` rows (same order SSR/client).
function splitRows(list) {
  if (!list?.length) return []
  const size = Math.ceil(list.length / rowCount)
  return Array.from({ length: rowCount }, (_, i) =>
    list.slice(i * size, i * size + size),
  )
    .filter((row) => row.length > 0)
    .map((row) => ({ items: tile(row), featured: false }))
}

// Build the full row list: featured supports row first, then member rows.
function buildRows(featured, members) {
  const rows = []
  if (featured?.length) rows.push({ items: tile(featured), featured: true })
  rows.push(...splitRows(members))
  return rows
}

// Fisher-Yates shuffle (in-place)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Shuffle only on the client, and only after hydration, to avoid an
// SSR/client mismatch. Until then we keep the deterministic source order.
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

// Derive rows reactively from the props so late-arriving async data (members
// / supports populate after hydration) is always reflected — no stale snapshot.
const rows = computed(() => {
  const shuf = (l) => (hydrated.value ? shuffle([...l]) : l)
  return buildRows(shuf(props.featuredItems), shuf(props.items))
})
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  overflow: hidden;
  padding: 0.5em 0;
}

.logo-skeleton {
  height: 130px;
}

/* Marquee track */
.marquee-track {
  overflow: hidden;
  width: 100%;
  margin-bottom: 8px;

  /* Featured (supports) row: logos twice as large as member rows. */
  &--featured {
    margin-bottom: 16px;

    .logo-item {
      width: 400px;
      height: 260px;
      padding: 20px;
      margin: 0 12px;
    }
  }
}

.marquee-content {
  display: flex;
  width: max-content;
  animation: marquee 67.5s linear infinite;

  .marquee-reverse & {
    animation-direction: reverse;
  }
}

/* One full set of logos; rendered twice inside .marquee-content */
.marquee-group {
  display: flex;
  flex-shrink: 0;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 200px;
  height: 130px;
  padding: 10px;
  margin: 0 6px;
  background-color: var(--rest-bg, transparent);
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
  width: 100%;
  height: 100%;
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
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 1px solid rgba(0, 0, 0, 0.12);
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
