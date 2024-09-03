<template>
  <!--  TODO 
  - add skeleton UI 
  - test lazy-src
  - validate requested quality 
  - Add conditional overlays slots (top left/right, bottom left/right/center for date, caption, copyright)-->

  <v-skeleton-loader
    v-if="rootStore.loading"
    height="100%"
    type="image"
  ></v-skeleton-loader>

  <template v-else>
    <nuxt-link
      :to="
        link
          ? localePath({
              name: link,
              params: { slug: slugify(slug) },
            })
          : null
      "
    >
      <div class="overflow-hidden">
        <!--  TODO debug why the picture is not displaying/sizing properly -->
        <v-img
          :aspect-ratio="ratio"
          cover
          class="img-animation"
          :lazy-src="img(src, { width: 10, quality: 70 })"
          :src="img(src, { width, quality: 70 })"
          :srcset="_srcset.srcset"
          :sizes="_srcset.sizes"
          :title="caption"
          v-bind="$attrs"
        >
        </v-img></div
    ></nuxt-link>
  </template>
</template>

<script setup>
import { useRootStore } from "~/store/root";

const img = useImage();

const rootStore = useRootStore();

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: { type: Number || Boolean, default: 0 },
  ratio: { type: String, required: true, default: "1" },
  caption: { type: String, default: "" },
  slug: { type: String, default: "" },
  link: { type: String, default: "" },
});

const _srcset = computed(() => {
  return img.getSizes(props.src, {
    sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
    modifiers: {
      format: "webp",
      quality: 70,
      ...(props.width && { width: props.width }),
    },
  });
});
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
[[1,23,41,55,75,87,95,100,105,110,115,119,124,128,132,136,140,144,149,153,157,161,165,169,173,177,181,185,189,193,197,201,205,209,213],{"date":2,"args":3,"type":5,"level":6,"tag":7,"filename":8,"stack":9},["Date","2024-09-03T14:06:48.114Z"],[4],"[intlify]
Not found 'PARIS IAS' key in 'en' locale
messages.","warn",1,"","file://node_modules/@intlify/shared/dist/shared.mjs",[10,14,19],{"function":5,"source":11,"line":12,"column":13},"/home/bob/Projects/seed/node_modules/@intlify/shared/dist/shared.mjs",114,13,{"function":15,"source":16,"line":17,"column":18},"handleMissing","/home/bob/Projects/seed/node_modules/@intlify/core-base/dist/core-base.mjs",881,7,{"function":20,"source":16,"line":21,"column":22},"resolveMessageFormat",1188,26,{"date":24,"args":25,"type":28,"level":29,"tag":7,"filename":30,"stack":31},["Date","2024-09-03T14:06:48.118Z"],[26,27],"route:
","index___en","log",2,"file://layouts/about.vue",[32,37],{"function":33,"source":34,"line":35,"column":36},"setup","/home/bob/Projects/seed/layouts/about.vue",22,9,{"function":38,"source":34,"line":39,"column":40},"_sfc_main.setup",277,23,{"date":42,"args":43,"type":28,"level":29,"tag":7,"filename":46,"stack":47},["Date","2024-09-03T14:06:48.172Z"],[44,45],"props.type:
","events","file://components/misc/atoms/SlidingCarousel.vue",[48,52],{"function":-1,"source":49,"line":50,"column":51},"/home/bob/Projects/seed/components/misc/atoms/SlidingCarousel.vue",47,11,{"function":-1,"source":49,"line":53,"column":54},46,98,{"date":56,"args":57,"type":28,"level":29,"tag":7,"filename":60,"stack":61},["Date","2024-09-03T14:06:48.173Z"],[58,59],"type:
","events/en","file://store/root.ts",[62,67,71],{"function":63,"source":64,"line":65,"column":66},"Proxy.update","/home/bob/Projects/seed/store/root.ts",292,15,{"function":68,"source":69,"line":70,"column":22},"Proxy.wrappedAction","/home/bob/Projects/seed/node_modules/pinia/dist/pinia.mjs",1405,{"function":72,"source":69,"line":73,"column":74},"store.\u003Ccomputed>",932,50,{"date":76,"args":77,"type":28,"level":29,"tag":7,"filename":60,"stack":80},["Date","2024-09-03T14:06:48.189Z"],[78,79],"target:
","events/en/",[81,83],{"function":63,"source":64,"line":82,"column":66},339,{"function":-1,"source":84,"line":85,"column":86},"async
/home/bob/Projects/seed/components/misc/atoms/SlidingCarousel.vue",48,10,{"date":88,"args":89,"type":5,"level":6,"tag":7,"filename":46,"stack":91},["Date","2024-09-03T14:06:48.207Z"],[90],"[Vue
warn]: Property \"n\" was accessed during render but is not defined on
instance.",[92],{"function":-1,"source":49,"line":93,"column":94},610,149,{"date":96,"args":97,"type":5,"level":6,"tag":7,"filename":46,"stack":98},["Date","2024-09-03T14:06:48.208Z"],[90],[99],{"function":-1,"source":49,"line":93,"column":94},{"date":101,"args":102,"type":5,"level":6,"tag":7,"filename":46,"stack":103},["Date","2024-09-03T14:06:48.208Z"],[90],[104],{"function":-1,"source":49,"line":93,"column":94},{"date":106,"args":107,"type":5,"level":6,"tag":7,"filename":46,"stack":108},["Date","2024-09-03T14:06:48.208Z"],[90],[109],{"function":-1,"source":49,"line":93,"column":94},{"date":111,"args":112,"type":5,"level":6,"tag":7,"filename":46,"stack":113},["Date","2024-09-03T14:06:48.208Z"],[90],[114],{"function":-1,"source":49,"line":93,"column":94},{"date":111,"args":116,"type":5,"level":6,"tag":7,"filename":7,"stack":118},[90,117],"(repeated
13
times)",[],{"date":120,"args":121,"type":5,"level":6,"tag":7,"filename":7,"stack":123},["Date","2024-09-03T14:06:48.247Z"],[122],"[Vue
warn]: Invalid prop: type check failed for prop \"ratio\". Expected String with
value \"1\", got Number with value
1.",[],{"date":125,"args":126,"type":5,"level":6,"tag":7,"filename":7,"stack":127},["Date","2024-09-03T14:06:48.250Z"],[122],[],{"date":129,"args":130,"type":5,"level":6,"tag":7,"filename":7,"stack":131},["Date","2024-09-03T14:06:48.251Z"],[122],[],{"date":133,"args":134,"type":5,"level":6,"tag":7,"filename":7,"stack":135},["Date","2024-09-03T14:06:48.252Z"],[122],[],{"date":137,"args":138,"type":5,"level":6,"tag":7,"filename":7,"stack":139},["Date","2024-09-03T14:06:48.253Z"],[122],[],{"date":137,"args":141,"type":5,"level":6,"tag":7,"filename":7,"stack":143},[122,142],"(repeated
4
times)",[],{"date":145,"args":146,"type":5,"level":6,"tag":7,"filename":7,"stack":148},["Date","2024-09-03T14:06:48.259Z"],[147],"[Vue
warn]: Invalid prop: type check failed for prop \"src\". Expected String with
value \"undefined\", got Undefined
",[],{"date":150,"args":151,"type":5,"level":6,"tag":7,"filename":7,"stack":152},["Date","2024-09-03T14:06:48.260Z"],[122],[],{"date":154,"args":155,"type":5,"level":6,"tag":7,"filename":7,"stack":156},["Date","2024-09-03T14:06:48.262Z"],[147],[],{"date":158,"args":159,"type":5,"level":6,"tag":7,"filename":7,"stack":160},["Date","2024-09-03T14:06:48.262Z"],[122],[],{"date":162,"args":163,"type":5,"level":6,"tag":7,"filename":7,"stack":164},["Date","2024-09-03T14:06:48.264Z"],[147],[],{"date":166,"args":167,"type":5,"level":6,"tag":7,"filename":7,"stack":168},["Date","2024-09-03T14:06:48.264Z"],[122],[],{"date":170,"args":171,"type":5,"level":6,"tag":7,"filename":7,"stack":172},["Date","2024-09-03T14:06:48.266Z"],[147],[],{"date":174,"args":175,"type":5,"level":6,"tag":7,"filename":7,"stack":176},["Date","2024-09-03T14:06:48.266Z"],[122],[],{"date":178,"args":179,"type":5,"level":6,"tag":7,"filename":7,"stack":180},["Date","2024-09-03T14:06:48.268Z"],[147],[],{"date":182,"args":183,"type":5,"level":6,"tag":7,"filename":7,"stack":184},["Date","2024-09-03T14:06:48.268Z"],[122],[],{"date":186,"args":187,"type":5,"level":6,"tag":7,"filename":7,"stack":188},["Date","2024-09-03T14:06:48.270Z"],[147],[],{"date":190,"args":191,"type":5,"level":6,"tag":7,"filename":7,"stack":192},["Date","2024-09-03T14:06:48.270Z"],[122],[],{"date":194,"args":195,"type":5,"level":6,"tag":7,"filename":7,"stack":196},["Date","2024-09-03T14:06:48.272Z"],[147],[],{"date":198,"args":199,"type":5,"level":6,"tag":7,"filename":7,"stack":200},["Date","2024-09-03T14:06:48.272Z"],[122],[],{"date":202,"args":203,"type":5,"level":6,"tag":7,"filename":7,"stack":204},["Date","2024-09-03T14:06:48.274Z"],[147],[],{"date":206,"args":207,"type":5,"level":6,"tag":7,"filename":7,"stack":208},["Date","2024-09-03T14:06:48.274Z"],[122],[],{"date":210,"args":211,"type":5,"level":6,"tag":7,"filename":7,"stack":212},["Date","2024-09-03T14:06:48.276Z"],[147],[],{"date":214,"args":215,"type":5,"level":6,"tag":7,"filename":7,"stack":216},["Date","2024-09-03T14:06:48.276Z"],[122],[]]
