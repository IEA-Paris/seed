import {
  url as urlRegex,
  email,
  alpha as alphaRegex,
  ytUrl as youtubeRegex,
  colorRegex as colorRules,
  rorRegex as rorRules,
  DOIRegex as doiRules,
  dateRegex as dateRules,
  orcidRegex as orcidRules,
} from "./regex"
export const requiredRules = (value) => {
  console.log(
    "required",
    value !== undefined &&
      value !== null &&
      value !== false &&
      (Array.isArray(value) || typeof value === "string"
        ? value.length > 0
        : true),
  )
  return (
    value !== undefined &&
    value !== null &&
    value !== false &&
    (Array.isArray(value) || typeof value === "string"
      ? value.length > 0
      : true)
  )
}

export const alphaRules = (value) => !value || alphaRegex.test(value)
export const minRules = (min) => (value) => {
  return !value || value.length >= min
}
export const maxRules = (max) => (value) => !value || value.length <= max

export const urlRules = (value) =>
  !value || (value.length > 0 && urlRegex.test(value))

export const emailRules = (value) =>
  !value || (value.length > 0 && emailRegex.test(value))

export const ytRules = (value) =>
  !value || (value.length > 0 && youtubeRegex.test(value))

export const ComputeInputVisibility = (visibilityRules, form) => {
  console.log("visibilityRules: ", visibilityRules)
  if (!visibilityRules?.default) return true
  let result = !!visibilityRules.default
  if (visibilityRules?.switchIf?.length > 0) {
    visibilityRules?.switchIf?.map((rule) => {
      // TODO : implement
      result = rule
    })
  }
  console.log("result: ", result)
  return result
}
export const GenerateInputRules = (input) => {
  const $t = useNuxtApp().$i18n.t
  if (!input?.rules) return []
  const rules = []
  if (Object.keys(input?.rules)?.length > 0) {
    Object.keys(input?.rules).forEach((rule) => {
      if (rule === "required") {
        rules.push((value) => {
          return requiredRules(value) || $t("rules.required")
        })
      }
      if (rule === "min") {
        rules.push((value) => {
          return (
            !!minRules(input.rules[rule])(value) ||
            $t("rules.at-least-0-characters", [input.rules[rule]])
          )
        })
      }
      if (rule === "max") {
        rules.push((value) => {
          return (
            !!maxRules(input.rules[rule])(value) ||
            $t("rules.max-0-characters", [input.rules[rule]])
          )
        })
      }
      if (rule === "email") {
        rules.push((value) => {
          return !!emailRules(value) || $t("rules.invalid-e-mail")
        })
      }
      if (rule === "url") {
        rules.push((value) => {
          return !!urlRules(value) || $t("rules.invalid-url")
        })
      }
      if (rule === "alpha") {
        rules.push((value) => {
          return (
            !!alphaRules(value) ||
            $t("rules.numbers-and-special-characters-not-allowed")
          )
        })
      }
      if (rule === "yt") {
        rules.push((value) => {
          return !!ytRules(value) || $t("rules.invalid-youtube-url")
        })
      }
      if (rule === "color") {
        rules.push((value) => {
          return !!colorRules(value) || t("invalid-color-code")
        })
      }
      if (rule === "ror") {
        rules.push((value) => {
          return !!rorRules(value) || t("invalid-ror-code")
        })
      }
      if (rule === "DOI") {
        rules.push((value) => {
          return !!doiRules(value) || t("invalid-doi-code")
        })
      }
      if (rule === "date") {
        rules.push((value) => {
          return !!dateRules(value) || t("invalid-date")
        })
      }
      if (rule === "digit") {
        rules.push((value) => {
          return typeof value === "number" || t("rules.only-digits-allowed")
        })
      }
      if ((rule = "orcid")) {
        rules.push((value) => {
          return !!orcidRules(value) || t("invalid-orcid")
        })
      }
    })
  }
  return rules
}
