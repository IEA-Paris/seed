import { FormEvent } from "~/data/event"

export default async (schema: FormEvent ): Promise<FormEvent> => {
  for await (const key of Object.keys(schema)) {
    console.log("key: ", key)
    // is it a template?
    if (schema[key] && schema[key]?.type === 3) {
      const templateState: FormEvent = (await import(`../../data/${key}.ts`)).default.form
      /* console.log("templateState for subtemplate: ", templateState) */

      // SHOW ANTOINE
      schema[key].items = templateState 
      // check if it is an object or a collection?
    }
  }
  return schema
}
