export default async (schema) => {
  for await (const key of Object.keys(schema)) {
    console.log("key: ", key)
    // is it a template?
    if (schema[key] && schema[key]?.type === 3) {
      const templateState = (await import(`../../data/${key}.ts`)).default.form
      /* console.log("templateState for subtemplate: ", templateState) */
      schema[key].items = templateState

      // check if it is an object or a collection?
    }
  }
  return schema
}
