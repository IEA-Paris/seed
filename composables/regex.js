export const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// eslint-disable-next-line no-misleading-character-class
export const alpha =
  /^[-' a-zA-ZàâéêèìôùûçáéíóúäëïöüÄ'陳大文łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹßÇŒÆČŠŽ.âê都道府県Федерацииআবাসযোগ্য জমির걸쳐 있는]*$/

// eslint-disable-next-line no-useless-escape
export const url =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
export const isValidPassword =
  /^(?=.*[a-z]){1,}(?=.*[A-Z]){1,}(?=.*[0-9]){1,}.{8,}$/
// eslint-disable-next-line no-useless-escape
export const isValidCode = new RegExp("(^d{6})")
export const ytUrl =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
// TODO create color regex
export const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
export const rorRegex = /^0[a-z|0-9]{6}[0-9]{2}$/

export const DOIRegex = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i

export const dateRegex = /^\d{4}-([0][1-9]|1[0-2])-([0][1-9]|[1-2]\d|3[01])$/

export const orcidRegex = /^(\d{4}-){3,}\d{3}(\d|X)$/
