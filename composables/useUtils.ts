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
