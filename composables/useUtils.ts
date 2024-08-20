export const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale)
}

export const getDetailedFormatedDate = (
  dateStr: string,
  locale: string
): {
  day: number
  month: string
  year: number
  hours: number
  minutes: number
} => {
  const date = new Date(dateStr)
  console.log("dateStr: ", {
    day: date.getDay(),
    month: date.toLocaleString(locale, { month: "long" }),
    year: date.getFullYear(),
    hours: date.getUTCHours(),
    minutes: date.getMinutes(),
  })
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
