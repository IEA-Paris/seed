export const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale)
}

export const getDetailedFormatedDate = (
  dateStr: string,
  locale: string,
): {
  day: number
  month: string
  year: number
  hours: number
  minutes: number
} => {
  const date = new Date(dateStr)

  return {
    day: date.getDay(),
    month: date.toLocaleString(locale, { month: "long" }),
    year: date.getFullYear(),
    hours: date.getUTCHours(),
    minutes: date.getMinutes(),
  }
}

export const capitalize = (value: string, multiple?: boolean) =>
  multiple
    ? value.replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase())
    : value && value.charAt(0).toUpperCase() + value.slice(1)
export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, "").trim() // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaeeeeiiiioooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}
export const getSlugFromPath = (str: string) => {
  return str.split("/").pop()
}
