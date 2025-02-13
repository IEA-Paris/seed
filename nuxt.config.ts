import config from "./static.config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  sourcemap: {
    server: true,
    client: true,
  },

  ssr: true,

  site: {
    url: "https://paris-iea.fr",
    name: "Paris Institute for Advanced Study",
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
          api: "modern-compiler",
          /*           additionalData: '@use "@/assets/styles/_variables.scss" as *;', */
        },
      },
    },
    build: {
      target: "esnext", //browsers can handle the latest ES features
    },
  },

  nitro: {
    prerender: {
      /*  crawlLinks: true, */
      failOnError: false,
    },
  },
  /*   plugins: [{ src: "~/plugins/flickity.js", ssr: false }], */
  modules: [
    "@pinia/nuxt",
    "@nuxt/content",
    /* "@nuxtjs/html-validator", */ // https://nuxt.com/modules/html-validator
    // Cross-Site Request Forgery (CSRF) prevention (https://nuxt.com/modules/csurf).
    "nuxt-csurf",
    "@nuxt/image",
    "nuxt-swiper",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    // https://github.com/nuxt-community/device-module
    /* "@nuxtjs/device", */
    // https://github.com/nuxt-modules/robots
    "@nuxtjs/robots",
    //
    "@nuxtjs/google-fonts",
    "nuxt-link-checker",
    "nuxt-schema-org",
    "@vite-pwa/nuxt",
    "@nuxtjs/apollo",
    "@vueuse/motion/nuxt",
    //https://nuxt.com/docs/getting-started/testing
    "@nuxt/test-utils/module",
    /*     "@nuxtjs/html-validator", */
    "@stefanobartoletti/nuxt-social-share",
  ],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  // https://nuxt.com/modules/nuxt-social-share
  socialShare: {
    baseUrl: "https://www.paris-iea.fr", // required!
    // other optional module options
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    experimental: {
      search: {
        indexed: true,
      },
    },

    markdown: {
      toc: { depth: 2, searchDepth: 2 },
      rehypePlugins: [
        /* "rehype-figure" */
      ],
      // Object syntax can be used to override default options
      remarkPlugins: {
        // Override remark-emoji options
        /*   "remark-emoji": {
          emoticon: true,
        }, */
        // Disable remark-gfm
        /*   "remark-gfm": false,
        // Add remark-oembed
        "remark-oembed": {
          // Options
        }, */
      },
    },
  },

  image: {
    // https://image.nuxt.com/get-started/configuration
  },
  swiper: {
    // Default parameters
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  routeRules: {
    "/api/**": { isr: false },
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
   
    // https://v8.i18n.nuxtjs.org/options/vue-i18n
  },

  pwa: {
    //https://vite-pwa-org.netlify.app/frameworks/nuxt.html
    /* PWA options */,
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
    clients: {
      default: {
        httpEndpoint: config.graphqlEndpoint,
        httpLinkOptions: {
          headers: {
            "x-api-key": config.graphqlApiKey,
          },
        },
        inMemoryCacheOptions: {
          addTypename: false,
        },
      },
    },
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
  experimental: {
    asyncContext: true,
  },
  devtools: {
    enabled: !!process.env.LOCAL_DEV,
  },

  compatibilityDate: "2024-09-03",
})
