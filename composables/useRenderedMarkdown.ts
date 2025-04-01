// import { ref, watchEffect } from "vue"
// import markdownParser from "@nuxt/content/transformers/markdown"
// export function useRenderedMarkdown(
//   source: () => string | undefined,
//   key: string,
// ) {
//   const rendered = ref("")

//   watchEffect(async () => {
//     try {
//       const text = source()
//       rendered.value = text ? await markdownParser.parse(key, text) : ""
//     } catch (error) {
//       console.error("Error parsing markdown:", error)
//       rendered.value = ""
//     }
//   })

//   return rendered
// }

import { ref, watchEffect } from "vue"
import markdownParser from "@nuxt/content/transformers/markdown"

export function useRenderedMarkdown(
  source: () => string | undefined,
  key: string,
) {
  const rendered = ref({})

  watchEffect(async () => {
    try {
      const markdownText = source()

      if (!markdownText?.trim()) {
        rendered.value = {}
        return
      }

      const parsed = await markdownParser.parse(key, markdownText)

      if (
        parsed &&
        parsed.body &&
        Array.isArray(parsed.body.children) &&
        parsed.body.children.length > 0
      ) {
        rendered.value = parsed
      } else {
        rendered.value = {}
      }
    } catch (error) {
      console.error(`Error parsing markdown for ${key}":`, error)
      rendered.value = {}
    }
  })

  return rendered
}
