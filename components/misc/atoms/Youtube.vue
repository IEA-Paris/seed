<template>
  <div style="page-break-inside: avoid">
    <div
      style="position: relative; padding-bottom: 56.25%; height: 0"
      @focus="handleEvent('playVideo')"
      @mouseenter="handleEvent('playVideo')"
      @mouseleave="handleEvent('pauseVideo')"
      @blur="handleEvent('pauseVideo')"
    >
      <LiteYouTubeEmbed
        ref="ytPlayer"
        :id="yt"
        :title="caption"
        :params="youtubeParams"
      ></LiteYouTubeEmbed>
    </div>
    <div v-if="caption" class="text-caption">{{ caption }}</div>
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed"
import "vue-lite-youtube-embed/style.css"
const props = defineProps({
  yt: {
    type: String,
    required: true,
  },
  nocontrols: {
    type: Boolean,
    default: false,
  },
  caption: {
    type: String,
    default: "",
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  start: {
    type: [String, Number],
    default: "",
  },
  stop: {
    type: [String, Number],
    default: "",
  },
})

/* iframe.value?.stopVideo()
iframe.value?.pauseVideo()
iframe.value?.playVideo() */
const youtubeParams = computed(() => {
  return (
    (props.nocontrols ? "controls=0&" : "") +
    "modestbranding=2&rel=0&enablejsapi=1" +
    (props.start ? "&start=" + props.start : "") +
    (props.stop ? "&stop=" + props.stop : "")
  )
})

const handleEvent = (event) => {
  // await ytPlayer.value[event]();
}
</script>

<style lang="scss">
lite-youtube {
  max-width: none !important;
}
</style>
