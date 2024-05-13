import { Form } from "~/data/form";

export default async (
  schema: Record<string, Form>
): Promise<Record<string, Form>> => {
  for await (const key of Object.keys(schema)) {
    // is it a template?
    if (schema[key] && schema[key]?.type === 3) {
      const templateState: Record<string, Form> = (
        await import(`../../data/${key}.ts`)
      ).default.form;
      schema[key].items = templateState;
    }
    // check if it is an object or a collection?
  }
  return schema;
};
