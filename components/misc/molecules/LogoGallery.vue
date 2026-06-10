<template>
  <!-- Skeleton loading state -->
  <div v-if="props.loading" class="logo-container">
    <v-row dense>
      <v-col v-for="n in 4" :key="n" cols="4" sm="3" md="2">
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
        'marquee-track--supports': row.supports,
      }"
    >
      <div class="marquee-content">
        <!-- Two identical groups → seamless -50% loop. Each group is tiled
             enough times to overflow the track, so no empty gap appears. -->

        <v-menu
          v-for="(item, i) in row.items"
          :key="`item-${i}`"
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
              :style="{
                '--hover-bg': item.color || '#fff',
                '--rest-bg':
                  item.color &&
                  !['#fff', '#ffffff', 'white'].includes(
                    item.color.toLowerCase(),
                  )
                    ? '#e0e0e0'
                    : 'transparent',
              }"
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
</template>

<script setup>
const props = defineProps({
  // Members — split across `rowCount` regular rows below the supports row.
  members: { type: Array, default: () => [] },
  // Supports — rendered as a single, larger supports first row.
  supports: { type: Array, default: () => [] },
  funding: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  rowCount: { type: Number, default: 3 },
})

const rowCount = props.rowCount

// Minimum logos per row group so one group always overflows a wide track.
// A logo-item is ~200px wide; ~10 fills any realistic viewport, after which
// the duplicated group makes the -50% loop seamless with no empty gap.
const MIN_PER_ROW = 10

// Tile a row's members until it reaches at least MIN_PER_ROW, so short rows
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

// Build the full row list: supports supports row first, then member rows.
function buildRows(supports, members, funding) {
  const rows = []
  if (supports?.length) {
    rows.push({ items: tile(shuffle(supports)), supports: true })
  }
  rows.push({ items: tile(shuffle(members)), supports: false })
  rows.push({
    items: tile([...funding, ...funding]),
    supports: false,
  })
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
    if (props.supports?.length) {
      rows.push({ items: tile(props.supports), supports: true })
    }
    if (props.members?.length) {
      rows.push({ items: tile(props.members), supports: false })
    }
    if (props.funding?.length) {
      rows.push({ items: tile(props.funding), supports: false })
    }
    return rows
  }
  return buildRows(props.supports, props.members, props.funding)
})
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  overflow: hidden;
  padding: 0.5em 0;
}

.logo-skeleton {
  height: 80px;

  @media (min-width: 600px) {
    height: 104px;
  }

  @media (min-width: 960px) {
    height: 130px;
  }
}

/* Marquee track.
   Logo sizing is mobile-first: the base rules below are the smallest
   (phone) size, scaled up at the 600px / 960px breakpoints (matching the
   Vuetify sm/md breakpoints used elsewhere on this page). */
.marquee-track {
  overflow: hidden;
  width: 100%;
  margin-bottom: 6px;

  /* supports (supports) row: logos larger than member rows at every size. */
  &--supports {
    margin-bottom: 10px;

    .logo-item {
      width: 180px;
      height: 120px;
      padding: 12px;
      margin: 0 8px;
    }
  }

  @media (min-width: 600px) {
    margin-bottom: 8px;

    &--supports {
      margin-bottom: 14px;

      .logo-item {
        width: 280px;
        height: 180px;
        padding: 16px;
        margin: 0 10px;
      }
    }
  }

  @media (min-width: 960px) {
    &--supports {
      margin-bottom: 16px;

      .logo-item {
        width: 400px;
        height: 260px;
        padding: 20px;
        margin: 0 12px;
      }
    }
  }
}

.marquee-content {
  display: flex;
  width: max-content;
  /* Smaller logos on mobile → shorter track, so scroll a bit faster to keep
     a comparable perceived speed. */
  animation: marquee 45s linear infinite;

  .marquee-reverse & {
    animation-direction: reverse;
  }

  @media (min-width: 600px) {
    animation-duration: 56s;
  }

  @media (min-width: 960px) {
    animation-duration: 67.5s;
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
  width: 120px;
  height: 80px;
  padding: 6px;
  margin: 0 4px;
  background-color: var(--rest-bg, transparent);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;

  @media (min-width: 600px) {
    width: 160px;
    height: 104px;
    padding: 8px;
    margin: 0 5px;
  }

  @media (min-width: 960px) {
    width: 200px;
    height: 130px;
    padding: 10px;
    margin: 0 6px;
  }

  /* Hover is a no-op on touch; only scale up where a real pointer exists. */
  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
      background-color: var(--hover-bg, #fff);

      .logo-img {
        filter: none;
      }
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
