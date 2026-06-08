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
// still fill the marquee track instead of leaving it ~empty. Only kicks in
// when the pool itself is smaller than MIN_PER_ROW (few members) — at that
// point in-row repeats are unavoidable.
function tile(list) {
  if (!list.length) return list
  const out = []
  while (out.length < MIN_PER_ROW) out.push(...list)
  return out
}

// Fisher-Yates shuffle (returns a new array; never mutates the source).
function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Rotate a list left by `n` (mod length): [a,b,c,d] rotated by 1 → [b,c,d,a].
function rotate(list, n) {
  if (!list.length) return list
  const k = ((n % list.length) + list.length) % list.length
  return list.slice(k).concat(list.slice(0, k))
}

// Build member rows: each row holds the FULL pool, but in its OWN independent
// shuffle, then phase-offset so the windows start far apart. This satisfies:
//  • no duplicate within a row — each logo appears once per loop;
//  • no fixed set per row — every row is the whole pool, reshuffled;
//  • different sequence per row — independent shuffles;
//  • minimal cross-row collisions — distinct orders + a ~len/rowCount phase
//    offset keep the visible windows from lining up (best-effort: wider
//    screens show more per row, so some overlap is unavoidable).
function splitRows(list) {
  if (!list?.length) return []
  const pool = tile(list)
  const stride = Math.max(1, Math.floor(pool.length / rowCount))
  return Array.from({ length: rowCount }, (_, i) => ({
    // Independent shuffle per row, then rotate to stagger the start position.
    items: rotate(shuffle(pool), stride * i),
    featured: false,
  }))
}

// Build the full row list: featured supports row first, then member rows.
function buildRows(featured, members) {
  const rows = []
  if (featured?.length) rows.push({ items: tile(shuffle(featured)), featured: true })
  rows.push(...splitRows(members))
  return rows
}

// Shuffle only on the client, and only after hydration, to avoid an
// SSR/client mismatch. Until then we keep the deterministic source order.
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

// Derive rows reactively from the props so late-arriving async data (members /
// supports populate after hydration) is always reflected. Before hydration we
// emit deterministic source order (single row each) to match the server render;
// after hydration each row gets its independent shuffled, staggered full pool.
const rows = computed(() => {
  if (!hydrated.value) {
    const rows = []
    if (props.featuredItems?.length) {
      rows.push({ items: tile(props.featuredItems), featured: true })
    }
    if (props.items?.length) {
      rows.push({ items: tile(props.items), featured: false })
    }
    return rows
  }
  return buildRows(props.featuredItems, props.items)
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
