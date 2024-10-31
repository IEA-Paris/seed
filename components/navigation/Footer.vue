<template>
  <section>
    <v-footer
      dark
      color="black"
      class="d-flex justify-center align-center"
      :class="{ 'fill-height': isSnapScroll }"
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <nuxt-link
              :to="localePath('/')"
              style="transition: all 500ms ease 0s"
              @click.native="$vuetify.goTo(0)"
            >
              <v-img
                src="/Logo_white.png"
                contain
                width="200"
                class="my-6 ml-n4"
              ></v-img>
            </nuxt-link>
            <div class="text-body-2 my-6">
              <div>
                {{ config.full_name }}
              </div>
              <div>
                {{ config.address }}
              </div>

              <div>
                {{ config.postcode_country }}
              </div>

              <div>
                {{ config.phone }}
              </div>
              <div>
                <a mailto="information@paris-iea.fr">{{ config.email }}</a>
              </div>
            </div>
            <iframe
              title="openstreetmap"
              :width="
                ['100%', '100%', '80%', '80%', '80%', '80%'][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
              absolute
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633"
              style="border: 1px solid black"
              @click="
                router.go(
                  'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911',
                )
              "
              @keyup.enter="
                router.go(
                  'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911',
                )
              "
            ></iframe>
            <br />
            <small
              ><a
                style="color: white"
                href="https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911"
                >{{ $t("view-larger-map") }}</a
              ></small
            >
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col class="ml-md-4" cols="12" xs="10" md="9">
                <div class="overline">
                  {{ $t("subscribe-to-our-newsletter") }}
                </div>
                <div class="mt-2">
                  <v-text-field
                    v-model="email"
                    :rules="rules"
                    :label="$t('email')"
                    variant="outlined"
                    tile
                  >
                  </v-text-field>
                  <v-btn block size="large" v-show="false">{{
                    $t("subscribe")
                  }}</v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="3"> </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-list class="mt-n3" bg-color="transparent">
                  <v-list-item :to="localePath('/about/institute')" nuxt>
                    <v-list-item-title
                      class="text-uppercase text-caption"
                      v-text="$t('about-us')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/contact')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-caption"
                      v-text="$t('contact')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item :to="localePath('/visit')" nuxt>
                    <v-list-item-title
                      class="text-uppercase text-caption"
                      v-text="$t('visit')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/pressroom')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-caption"
                      v-text="$t('pressroom')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/support')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-caption"
                      v-text="$t('support')"
                    ></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="6">
                <MiscAtomsSocials
                  dark
                  :socials="config.socials"
                  labelled
                ></MiscAtomsSocials>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="d-flex align-end" no-gutters>
          <v-col cols="12">
            <!--  <v-tooltip
                v-for="(item, index) in socialsRef"
                :key="index"
                location="top"
                :text="item.text"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    :href="item.url"
                    icon
                    dark
                    color="grey"
                    class="mx-3"
                    v-bind="props"
                  >
                    <v-icon color="white">mdi-{{ item.icon }}</v-icon>
                  </v-btn>
                </template>
              </v-tooltip> -->
          </v-col>
          <v-col cols="12" align="center" class="mt-3">
            <v-btn variant="text" size="small" nuxt dark>
              <!-- TODO add raw licence file url on github -->
              &copy; {{ new Date().getFullYear() }} {{ $t("paris-ias") }}</v-btn
            >
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="localePath('/terms_of_service')"
            >
              {{ $t("tos") }}
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="localePath('/privacy_policy')"
            >
              {{ $t("privacy") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </section>
</template>
<script setup>
// import socials from "~/assets/data/social"
// import sitemap from "~/assets/data/sitemap"
import { useDisplay } from "vuetify"
import { useI18n } from "vue-i18n"

const config = useAppConfig()
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { smAndDown, name } = useDisplay()
const { router } = useRouter()
const nuxtApp = useNuxtApp()

const { $vuetify } = nuxtApp
const socialsRef = ref(config.socials)
const panel = reactive([])
const footer = ref(config.sitemap.footer)
const email = ref("")
const props = defineProps({
  isSnapScroll: Boolean,
})
const rules = [
  //TODO internationalzie the error messages
  (value) => !!value || "Required.",
  (value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    ) || t("invalid-e-mail"),
]
</script>
<style lang="scss">
.v-footer.fill-height {
  height: calc(100vh - 64px);
  /* scroll-snap-stop: normal; */
}

.footer-image {
  filter: brightness(1.5) contrast(1.5);
}

.text-white {
  color: white !important;
}

.text-black {
  color: black !important;
}

.transition-all {
  transition: color 0.3s ease;
}
</style>
