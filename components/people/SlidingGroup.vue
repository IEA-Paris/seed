<template>
  <div class="d-flex align-center flex-row justify-space-between">
    <slot></slot>
    <div class="d-flex align-center justify-end">
      <!--  <div class="mr-8">{{ current + 1 }} / {{ items.length }}</div> -->
      <v-btn icon :disabled="current === 0" @click="prev()" class="mr-2" flat>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon :disabled="current === items.length - 1" @click="next()" flat>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
  <div class="people-carousel">
    <div class="inner" ref="inner" :style="innerStyles">
      <div class="card" v-for="(item, index) in items" :key="index">
        <PeopleSlidingItem :item="item"></PeopleSlidingItem>
      </div>
    </div>
  </div>
</template>

<script setup>
const innerStyles = ref({})
const step = ref("")
const transitioning = ref(false)
const inner = ref(null)
const props = defineProps({
  items: [Object],
})
const current = ref(0)
onMounted(() => {
  setStep()
  resetTranslate()
})
const setStep = () => {
  const innerWidth = inner.scrollWidth
  const totalCards = props.items.length
  step.value = `${innerWidth / totalCards}px`
}
const next = () => {
  if (transitioning.value) return

  transitioning.value = true

  moveLeft()

  afterTransition(() => {
    const card = props.items.shift()
    props.items.push(card)
    resetTranslate()
    transitioning.value = false
  })
}
const prev = () => {
  if (transitioning.value) return

  transitioning.value = true

  moveRight()

  afterTransition(() => {
    const card = props.items.pop()
    props.items.unshift(card)
    resetTranslate()
    transitioning.value = false
  })
}
const moveLeft = () => {
  innerStyles.value = {
    transform: `translateX(-${step.value})
                translateX(-${step.value})`,
  }
}
const moveRight = () => {
  innerStyles.value = {
    transform: `translateX(${step.value})
                translateX(-${step.value})`,
  }
}
const afterTransition = (callback) => {
  console.log("inner: ", inner)
  const listener = () => {
    callback()
    inner.removeEventListener("transitionend", listener)
  }
  inner.addEventListener("transitionend", listener)
}
const resetTranslate = () => {
  innerStyles.value = {
    transition: "none",
    transform: `translateX(-${step.value})`,
  }
}
</script>

<style>
.people-carousel {
  overflow: hidden;
}

.inner {
  transition: transform 0.2s;
  white-space: nowrap;
}

.card {
  display: inline-flex;
}
</style>
