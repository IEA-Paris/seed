import config from "~/static.config"
// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css"

import "vuetify/styles"
import { createVuetify } from "vuetify"

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: config.theme.themes.light,
        },
        dark: {
          colors: {
            primary: "#2196f3",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
            surface: "#121212",
            background: "#000000",
          },
        },
      },
    },
    icons: {
      defaultSet: "mdi",
    },
    defaults: {
      /*   VBtn: {
        variant: "flat",
        color: "default",
      },
      VCard: {
        elevation: 2,
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
      },
      VSelect: {
        variant: "outlined",
        density: "comfortable",
      },
      VTextarea: {
        variant: "outlined",
        density: "comfortable",
      },
      VNavigationDrawer: {
        elevation: 1,
      },
      VAppBar: {
        elevation: 1,
      },
      VList: {
        density: "comfortable",
      },
      VListItem: {
        color: "primary",
      }, */
    },
    display: {
      mobileBreakpoint: "sm",
      thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  })
  app.vueApp.use(vuetify)
})
