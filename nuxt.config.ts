import config from "./static.config"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  site: {
    url: "https://paris-iea.fr",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: config.name,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: config.description },
        { name: "msapplication-TileColor", content: "#FFFFFF" },
        // PWA primary color
        { name: "theme-color", content: config.theme.themes.light.primary },
        // Facebook
        { property: "author", content: config.name },
        { property: "og:site_name", content: config.url },
        { property: "og:locale", content: "en_US" },
        { property: "og:type", content: "website" },
        // Twitter
        { property: "twitter:site", content: config.url },
        { property: "twitter:domain", content: config.url },
        { property: "twitter:creator", content: config.name },
        { property: "twitter:card", content: "summary" },
        { property: "twitter:image:src", content: "/images/icon.png" },
        { property: "og:url", content: config.url },
        { property: "og:title", content: config.name },
        { property: "og:description", content: config.description },
        { name: "twitter:site", content: config.url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: config.logo },
        { property: "og:image", content: config.logo },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
      ],
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/content",
    /* "@nuxtjs/html-validator", */ // https://nuxt.com/modules/html-validator
    "nuxt-csurf", // Cross-Site Request Forgery (CSRF) prevention (https://nuxt.com/modules/csurf).
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/device", // https://github.com/nuxt-community/device-module
    "@nuxtjs/robots", // https://github.com/nuxt-modules/robots
    "@nuxtjs/google-fonts", //
    "nuxt-simple-sitemap",
    "nuxt-link-checker",
    "nuxt-schema-org",
    "@vite-pwa/nuxt",
    "@nuxtjs/apollo",
    "@vueuse/motion/nuxt",
  ],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    experimental: {
      clientDB: true,
    },
  },
  image: {
    // https://image.nuxt.com/get-started/configuration
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  i18n: {
    langDir: "translations/",
    locales: config.lang.locales,
    defaultLocale: config.lang.default,
    baseUrl: config.url,
    lazy: true,
    detectBrowserLanguage: {
      alwaysRedirect: true,
      redirectOn: "root", // recommended
      fallbackLocale: "en",
      useCookie: true,
      cookieKey: "i18n_redirected",
    } /* 
    customRoutes: "config",
    pages: {
      "/about/institute": {
        fr: "/a-propos/institut",
      },
      "/about/scientific_policy": {
        fr: "/a-propos/politique-scientifique",
      },
      "/about/network": {
        fr: "/a-propos/reseau",
      },
      "/activities/fellowships": {
        fr: "/activites/residences",
      },
      "/activities/programs": {
        fr: "/activites/programmes",
      },
      "/activities/events": {
        fr: "/activites/evenements",
      },
      "/people/team": {
        fr: "/equipe",
      },
      "/people/scientific-advisory-board": {
        fr: "/conseil-scientifique",
      },
    }, */,
    // https://v8.i18n.nuxtjs.org/options/vue-i18n
  },
  pwa: {
    //https://vite-pwa-org.netlify.app/frameworks/nuxt.html
    /* PWA options */
  },
  robots: {
    // https://nuxt.com/modules/robots#options
  },
  googleFonts: {
    // https://google-fonts.nuxtjs.org/getting-started/options
    families: config.modules.fonts.families,
    preconnect: true,
    prefetch: true,
    display: "swap",
  },
  apollo: {
    // https://apollo.nuxtjs.org/getting-started/configuration
    clients: { default: { httpEndpoint: "https://api.spacex.land/graphql" } },
  },
  htmlValidator: {
    usePrettier: false,
    logLevel: "verbose",
    failOnError: false,
    options: {
      extends: [
        "html-validate:document",
        "html-validate:recommended",
        "html-validate:standard",
      ],
      rules: {
        "svg-focusable": "off",
        "no-unknown-elements": "error",
        // Conflicts or not needed as we use prettier formatting
        "void-style": "off",
        "no-trailing-whitespace": "off",
        // Conflict with Nuxt defaults
        "require-sri": "off",
        "attribute-boolean-style": "off",
        "doctype-style": "off",
        // Unreasonable rule
        "no-inline-style": "off",
      },
    },
  },
})
