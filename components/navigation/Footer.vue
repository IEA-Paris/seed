<template>
  <section>
    <v-footer
      dark
      color="black"
      class="d-flex justify-center align-center"
      :class="{ 'fill-height': isSnapScroll }"
    >
      <v-container class="fill-height">
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="10" class="mt-6">
            <!--    <nuxt-link :to="localePath('/')" style="transition: all 500ms ease 0s" @click.native="$vuetify.goTo(0)">
            <v-img src="/logo_text_alt.svg" contain width="200" class="my-6"></v-img>
          </nuxt-link> -->
            <v-row justify="center">
              <v-col cols="12" sm="4" :order="smAndDown ? 'last' : ''">
                <NavigationLogo></NavigationLogo>

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
                  width="100%"
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
                <!-- TODO i18n and color for below text -->
                <!-- <small><a href="">View Larger Map</a></small> -->
              </v-col>
              <v-col cols="12" sm="4">
                <v-list bg-color="transparent">
                  <v-list-item :to="localePath('/about/institute')" nuxt>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('about-us')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/contact')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('contact')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item :to="localePath('/visit')" nuxt>
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('visit')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/pressroom')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('pressroom')"
                    ></v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    :to="localePath('/support')"
                    nuxt
                    @click="open = false"
                  >
                    <v-list-item-title
                      class="text-uppercase text-button"
                      v-text="$t('support')"
                    ></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="4" :order="smAndDown ? 'first' : ''">
                <div class="overline mt-n4">
                  {{ $t("subscribe-to-our-newsletter") }}
                </div>

                <v-text-field
                  v-model="email"
                  :rules="rules"
                  :label="$t('email')"
                  variant="outlined"
                >
                </v-text-field>
                <v-btn block size="large" v-show="false">{{
                  $t("subscribe")
                }}</v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters class="mt-3">
              <v-col cols="12" align="center">
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
                  &copy; {{ new Date().getFullYear() }}
                  {{ $t("paris-ias") }}</v-btn
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
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </section>
</template>
<script setup>
import socials from "~/assets/data/social"
import sitemap from "~/assets/data/sitemap"
import { useDisplay } from "vuetify"
import { useI18n } from "vue-i18n"

const config = useAppConfig()
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { smAndDown } = useDisplay()
const { router } = useRouter()
const nuxtApp = useNuxtApp()

const { $vuetify } = nuxtApp
const socialsRef = ref(socials)
const panel = reactive([])
const footer = ref(sitemap.footer)
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
</style>
