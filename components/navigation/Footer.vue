<template>
  <section style="background-color: #0b0b0b">
    <v-footer
      dark
      class="d-flex justify-center align-center dark"
      :class="{ 'snap-fill-height': isSnapScroll }"
      style="background-color: #0b0b0b"
    >
      <v-container
        class="d-flex flex-column justify-space-between h-100 mt-md-12"
      >
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="10" class="mt-12">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <nuxt-link
                  :to="$localePath('/')"
                  style="transition: all 500ms ease 0s"
                  @click.native="$vuetify.goTo(0)"
                >
                  <v-img
                    src="/logo_white.png"
                    contain
                    width="200"
                    class="my-6 ml-n2 ml-md-n4"
                  ></v-img>
                </nuxt-link>
              </v-col>
              <v-col cols="12" md="6" class="mt-md-16 pl-4 pl-md-3">
                <div class="text-uppercase text-caption text-md-button mb-2">
                  {{ $t("subscribe-to-our-newsletter") }}
                </div>

                <!-- Honeypot field -->
                <input
                  v-model="honeypot"
                  type="text"
                  name="website"
                  autocomplete="off"
                  tabindex="-1"
                  style="
                    position: absolute;
                    left: -9999px;
                    width: 1px;
                    height: 1px;
                  "
                  aria-hidden="true"
                />

                <v-form ref="formRef" @submit.prevent="onSubmit">
                  <v-text-field
                    id="newsletter-email"
                    v-model="email"
                    :label="$t('email')"
                    variant="outlined"
                    tile
                    append-icon="mdi-send"
                    :disabled="isLoading"
                    :error-messages="errorMessage"
                    :success-messages="successMessage"
                    :density="mdAndUp ? 'default' : 'compact'"
                    @click:append="onSubmit"
                  >
                  </v-text-field>

                  <ClientOnly>
                    <v-expand-transition>
                      <div v-show="email.length > 1" class="text-caption ml-4">
                        {{
                          $t("by-subscribing-you-agree-to-our")
                        }}&nbsp;<nuxt-link
                          class="text-light-blue"
                          :to="$localePath('/terms_of_service')"
                          >{{ $t("terms-and-conditions") }}</nuxt-link
                        >
                      </div>
                    </v-expand-transition>
                  </ClientOnly>
                </v-form>

                <!-- Altcha verification modal -->
                <ClientOnly>
                  <v-dialog
                    v-model="showAltchaDialog"
                    max-width="400"
                    persistent
                    scroll-strategy="none"
                  >
                    <v-card>
                      <v-card-title class="text-h6">
                        {{
                          $t("verify-human") || "Let's verify you're a human"
                        }}
                      </v-card-title>
                      <v-card-text>
                        <div ref="altchaContainer"></div>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn variant="text" @click="cancelAltcha">
                          {{ $t("cancel") || "Cancel" }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </ClientOnly>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-0">
              <v-col cols="12" md="6" class="order-last order-md-0">
                <div class="mb-6">
                  <NuxtLink
                    class="text-subtitle-2 font-weight-medium mb-6 text-white"
                    :to="$localePath('/contact') + '#map'"
                  >
                    <span class="d-block">{{ config.full_name }}</span>

                    <span class="d-block">{{ config.address }}</span>

                    <span class="d-block">{{ config.postcode_country }}</span>

                    <span class="d-block">{{ config.phone }}</span>

                    <span class="d-block">{{ config.email }}</span>
                  </NuxtLink>
                </div>
                <div
                  class="footer-map"
                  style="max-width: 400px; border: 1px solid black"
                  @mouseenter="loadMap = true"
                  @focusin="loadMap = true"
                >
                  <img
                    v-if="!loadMap"
                    src="/map.png"
                    alt="Map placeholder"
                    width="100%"
                    style="display: block; cursor: pointer"
                    tabindex="0"
                    @click="loadMap = true"
                    @keyup.enter="loadMap = true"
                  />
                  <iframe
                    v-else
                    title="openstreetmap"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633"
                    style="display: block"
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
                </div>
                <br />
                <small
                  ><a
                    style="color: white"
                    href="https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911"
                    >{{ $t("view-larger-map") }}</a
                  ></small
                >
              </v-col>

              <v-col cols="12" md="6" class="pt-0">
                <v-row justify="center" no-gutters>
                  <v-col cols="12" sm="6">
                    <v-list
                      bg-color="transparent"
                      :density="mdAndUp ? 'default' : 'compact'"
                    >
                      <v-list-item
                        :to="$localePath('/about/institute')"
                        nuxt
                        class="pl-0"
                      >
                        <v-list-item-title
                          class="text-uppercase text-caption text-md-button"
                          v-text="$t('about-us')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="$localePath('/contact')"
                        class="pl-0"
                        nuxt
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-caption text-md-button"
                          v-text="$t('contact')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="$localePath('/pressroom')"
                        nuxt
                        class="pl-0"
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-caption text-md-button"
                          v-text="$t('pressroom')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="$localePath('/support')"
                        class="pl-0"
                        nuxt
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-caption text-md-button"
                          v-text="$t('support')"
                        ></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col class="pt-3">
                    <MiscAtomsSocials
                      dark
                      :socials="config.socials"
                      labelled
                    ></MiscAtomsSocials>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          no-gutters
          class="mt-3 flex-grow-0 flex-shrink-1"
        >
          <v-col cols="12" align="center" class="mt-3">
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="$localePath('/support_us')"
            >
              <!-- TODO add raw licence file url on github -->
              &copy; {{ new Date().getFullYear() }} {{ $t("paris-ias") }}</v-btn
            >
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="$localePath('/terms_of_service')"
            >
              {{ $t("tos") }}
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="$localePath('/privacy_policy')"
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
import { useI18n } from "vue-i18n"
import gql from "graphql-tag"
import { useDisplay } from "vuetify"

const config = useAppConfig()
const { t } = useI18n()
const { router } = useRouter()
const nuxtApp = useNuxtApp()

const { $vuetify } = nuxtApp
const email = ref("")
const isLoading = ref(false)
const errorMessage = ref("")
const successMessage = ref("")
const formRef = ref(null)
const altchaContainer = ref(null)
const honeypot = ref("") // Honeypot field - should remain empty
const formLoadTime = ref(Date.now()) // Track when form loads
const showAltchaDialog = ref(false)
const loadMap = ref(false)
const { mdAndUp } = useDisplay()

// Altcha widget DOM element (not reactive to avoid Vue tracking)
let altchaWidgetEl = null
let altchaScriptLoaded = false

// Load Altcha script once on mount
onMounted(() => {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/npm/altcha@0.6/dist/altcha.min.js"
  script.type = "module"
  script.async = true
  script.onload = () => {
    altchaScriptLoaded = true
  }
  document.head.appendChild(script)
})

const props = defineProps({
  isSnapScroll: Boolean,
})

// Step 1: Validate email/honeypot/time, then show Altcha modal
const onSubmit = async () => {
  errorMessage.value = ""
  successMessage.value = ""

  // Manual email validation
  if (!email.value) {
    errorMessage.value = t("required") || "Email is required"
    return
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = t("invalid-e-mail") || "Invalid email address"
    return
  }

  // Honeypot check
  if (honeypot.value) {
    console.warn("Honeypot triggered")
    errorMessage.value = t("subscription-error") || "Invalid submission"
    return
  }

  // Time-based check
  const submissionTime = Date.now() - formLoadTime.value
  if (submissionTime < 3000) {
    console.warn(`Submission too fast: ${submissionTime}ms`)
    errorMessage.value =
      t("submission-too-fast") || "Please wait a moment before submitting"
    return
  }

  // Open Altcha modal and create widget inside it
  showAltchaDialog.value = true

  await nextTick()

  if (altchaContainer.value) {
    // Clear any previous widget
    altchaContainer.value.innerHTML = ""

    const createWidget = () => {
      altchaWidgetEl = document.createElement("altcha-widget")
      altchaWidgetEl.setAttribute("challengeurl", "/api/newsletter/challenge")
      altchaWidgetEl.setAttribute("hidelogo", "false")
      altchaWidgetEl.addEventListener("statechange", (e) => {
        if (e.detail?.state === "verified") {
          subscribeToNewsletter()
        }
      })
      altchaContainer.value?.appendChild(altchaWidgetEl)
    }

    if (altchaScriptLoaded && customElements.get("altcha-widget")) {
      createWidget()
    } else {
      await customElements.whenDefined("altcha-widget")
      createWidget()
    }
  }
}

const cancelAltcha = () => {
  showAltchaDialog.value = false
  if (altchaContainer.value) {
    altchaContainer.value.innerHTML = ""
  }
  altchaWidgetEl = null
}

// Step 2: Called automatically when Altcha verification completes
const subscribeToNewsletter = async () => {
  const altchaPayload = altchaWidgetEl?.value
  if (!altchaPayload) {
    errorMessage.value =
      t("complete-security-check") || "Please complete the security check"
    showAltchaDialog.value = false
    return
  }

  showAltchaDialog.value = false
  isLoading.value = true

  try {
    // Verify Altcha with backend
    const { $apollo } = nuxtApp
    const verificationResult = await $apollo.defaultClient.query({
      query: gql`
        query checkAltcha($payload: String!) {
          checkAltcha(payload: $payload) {
            valid
            verified
          }
        }
      `,
      variables: {
        payload: altchaPayload,
      },
    })

    if (!verificationResult.data?.checkAltcha?.valid) {
      errorMessage.value =
        t("security-verification-failed") ||
        "Security verification failed. Please try again."
      return
    }

    // Subscribe to Mailchimp
    const response = await $fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: {
        email: email.value,
      },
    })

    successMessage.value = t("subscribed-successfully") || "✓ Subscribed!"
    email.value = ""

    // Clean up Altcha widget
    if (altchaContainer.value) {
      altchaContainer.value.innerHTML = ""
    }
    altchaWidgetEl = null

    // Reset form load time for next submission
    formLoadTime.value = Date.now()

    // Reset success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ""
    }, 5000)
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    if (error.statusCode === 409) {
      errorMessage.value =
        t("already-subscribed") || "This email is already subscribed"
    } else {
      errorMessage.value =
        error.data?.message ||
        t("subscription-error") ||
        "Failed to subscribe. Please try again."
    }

    // Clear error after 5 seconds
    setTimeout(() => {
      errorMessage.value = ""
    }, 5000)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss">
.v-footer.snap-fill-height {
  height: calc(100vh - 64px);

  @media (max-width: 959px) {
    height: auto;
  }
  /* scroll-snap-stop: normal; */
}

.footer-image {
  filter: brightness(1.5) contrast(1.5);
}
</style>
