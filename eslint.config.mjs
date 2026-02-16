// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": 1,
    "no-async-promise-executor": 0,
    "vue/max-attributes-per-line": 0,
    "vue/no-v-html": 0,
    "vue/html-self-closing": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/html-indent": 0,
    semi: ["error", "never"],
    curly: ["error", "multi-line"],
  },
})
