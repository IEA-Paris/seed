<template>
  <v-card
    :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title"
    class="pa-6 my-3"
    v-bind="$attrs"
  >
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          icon
          v-bind="attrs"
          :href="'/blog/' + item.slug"
          target="_blank"
          :title="item.post_title"
          small
          class="float-right"
          v-on="on"
        >
          <v-icon>mdi-open-in-new</v-icon></v-btn
        >
      </template>
      <span>Open in a new tab</span>
    </v-tooltip>
    <v-card-subtitle class="pb-0">
      <v-tooltip
        v-if="
          index === null && ['blog', 'blog-page-page'].includes($route.name)
        "
        bottom
      >
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-pin</v-icon>
        </template>
        <span>This post is pinned</span>
      </v-tooltip>
      {{
        new Date(item.date).toLocaleDateString("EN", {
          timezone: "UTC",
        })
      }}
      <!--  +    ' - ' +
        new Date(item.date).toLocaleTimeString('EN', {
          hour: '2-digit',
          minute: '2-digit',
          timezone: 'UTC', 
      })-->
    </v-card-subtitle>
    <v-card-title>
      <span class="text-h4" v-html="highlight(item.post_title, search)"></span>
    </v-card-title>

    <div class="px-3">
      <BlogTag
        v-for="(tag, index2) in sortedTags"
        :key="index2"
        :tag="tag"
        class="ma-1"
      ></BlogTag>
    </div>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <YoutubeEmbed
            v-if="item.youtube_video_id"
            :yt="item.youtube_video_id"
            class="mb-9 ml-3"
          ></YoutubeEmbed
        ></v-col>
      </v-row>
      <OptimizedImage v-if="item.picture" :src="item.picture" class="my-3">
      </OptimizedImage>
      <div v-if="item.images && item.images.length > 1" class="pb-8 pt-3">
        <v-carousel :height="$vuetify.breakpoint.mdAndUp ? '600' : '300'" cycle>
          <v-carousel-item
            v-for="image in item.images"
            :key="image"
            eager
            :lazy-src="$img(image, { width: 10, quality: 70 })"
            :src="$img(image, { height: 'auto', quality: 70 })"
            :srcset="_srcset(image).srcset"
            :sizes="_srcset(image).size"
          ></v-carousel-item>
        </v-carousel>
      </div>

      <small v-if="item.copyright" class="muted caption"
        >&copy; {{ item.copyright }}</small
      >
      <p v-if="item.description && $route.name === 'blog' && !show">
        {{ item.description }} &nbsp;<b
          v-if="item.description && $route.name === 'blog'"
          class="primary--text text-decoration-underline"
          style="cursor: pointer"
          @click="show = !show"
        >
          Read&nbsp;more</b
        >
      </p>
      <v-expand-transition>
        <nuxt-content
          v-show="$route.name !== 'blog' || show || !item.description"
          :document="item"
          class="px-3"
        />
      </v-expand-transition>

      <template v-if="item.authors.length">
        <div class="mb-3 px-3 font-italic">
          By
          <template v-if="item.authors.length === 2">
            {{ item.authors[0].name + " and " + item.authors[1].name }}
          </template>
          <span v-for="(author, index2) in item.authors" v-else :key="index2"
            >{{ author.name
            }}<template v-if="index2 < item.authors.length - 1"
              >,&nbsp;</template
            ></span
          >
        </div>
      </template>
      <SoundCloudEmbed
        v-for="(track, index2) in item.audio"
        :key="index2"
        :src="track"
      />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    search: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    sortedTags() {
      return this.$route.query?.tags?.length
        ? this.item.tags.reduce((acc, tag) => {
            if (
              this.$route.query.tags &&
              this.$route.query.tags.includes(JSON.stringify(tag))
            ) {
              return [tag, ...acc]
            }
            return [...acc, tag]
          }, [])
        : this.item.tags
    },
  },
  mounted() {},
  methods: {
    truncateString(str = "") {
      if (str.length <= 250) {
        return str
      }
      return str.slice(0, 250) + "..."
    },
    highlight: (word = "", query) => {
      const check = new RegExp(query, "ig")
      return word.replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText +
          "</strong>"
        )
      })
    },
    _srcset(src) {
      return this.$img.getSizes(src, {
        sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
        modifiers: {
          format: "webp",
          quality: 70,
        },
      })
    },
  },
}
</script>
<style lang="scss">
.nuxt-content p {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  line-height: 1.375rem !important;
  letter-spacing: 0.0071428571em !important;
}
</style>
