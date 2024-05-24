import completeSchema from "../utils/scripts/completeSchema";
import { configData, Form, Model, Sort, Views } from "@paris-ias/data";

interface List {
  items: any[];
  itemsPerPage?: number;
  itemsPerPageArray?: any[];
  filtersCount: number;
  views?: any;
  sort?: any;
  view: Views | string | undefined;
  filters: {
    years: any[];
    tags: any[];
    language: any[];
    thematic: any[];
    discipline: any[];
    type: any[];
  };
  total: number;
  skip: number;
  numberOfPages: number;
  limit?: number;
  search: string;
  page: number;
  sortBy?: Sort | undefined | number[];
  sortDesc?: boolean[];
}

interface CustomForm {
  values: Record<string, Form> | undefined;
  _defaults: Record<string, Form> | undefined;
  schema: Record<string, Form> | undefined;
}
interface ModuleType {
  source?: string;
  form: CustomForm;
  list: List;
  loading: any[];
  current: any;
}

const createModule = async (type: string): Promise<ModuleType> => {
  console.log("CREATING MODULE FOR: ", type);
  const baseType = configData[type] as Model;

  const baseSchema: Record<string, Form> = baseType.form;
  const defaultState: Record<string, Form> = await completeSchema(baseSchema);

  const defaultViewKey: string | undefined =
    baseType?.list?.views &&
    Object.keys(baseType.list.views).find((item) => {
      baseType.list.views[item]?.default === true;
    });
  const defaultView =
    defaultViewKey !== undefined
      ? baseType?.list.views[defaultViewKey]
      : undefined;

  const defaultSortKey: string | undefined =
    baseType?.list.sort &&
    Object.keys(baseType.list.sort).find((item) => {
      baseType.list.sort[item].default === true;
    });

  const defaultSort: Sort | undefined =
    defaultSortKey !== undefined
      ? baseType?.list.sort[defaultSortKey]
      : undefined;

  // Helper function to handle aliases
  const processAliases = async (
    aliases: string[]
  ): Promise<Record<string, Form>> => {
    let aliasTemplatesForms: Record<string, Form> = {};
    await Promise.all(
      aliases.map(async (alias) => {
        const aliasTemplate = configData[alias];
        aliasTemplatesForms = {
          ...aliasTemplatesForms,
          ...aliasTemplate.form,
        };
        return aliasTemplatesForms;
      })
    );
    return aliasTemplatesForms;
  };

  // Helper function to handle template types
  const processTemplate = async (key: string): Promise<any> => {
    const template = configData[key] as Model;
    // is it an implementation of another template?
    if (template.aliases?.length) {
      console.log("template aliases found:", template.aliases);
      const aliasTemplatesForms: Record<string, Form> = await processAliases(
        template.aliases
      );
      return await buildForm(aliasTemplatesForms);
      // build based on aliases
    } else {
      console.log("template found:", key);
      return await buildForm(template.form);
    }
  };

  // Helper function to process items within the schema
  const processItems = async (
    key: string,
    items: any[],
    form: any
  ): Promise<any> => {
    // only collection have items with an array type
    if (Array.isArray(items)) {
      // if (!form[key]) form[key] = [{}];
      if (!form[key]) {
        form[key] = [{}];
      }
      /*     for await (const item of items) {
        form[key][0] = {
          ...form[key][0],
          ...(await buildForm({ [item.key]: item })),
        }
      } */
      // else it's an object
    } else {
      if (!form[key]) form[key] = {};
      for await (const subkey of Object.keys(items)) {
        form[key] = {
          ...form[key],
          ...(await buildForm({ [subkey]: items[subkey] })),
        };
      }
    }
  };

  // Build the form
  const buildForm = async (schema: Record<string, Form>): Promise<any> => {
    try {
      let form: { [key: string]: any } = {};
      for await (const key of Object.keys(schema)) {
        switch (schema[key]?.type) {
          // document picker
          case 4:
            form[key] = schema[key]?.default ?? [];
            break;

          // template import
          case 3:
            form[key] = await processTemplate(key);
            break;

          // object
          case 2:
            await processItems(key, schema[key].items, form);
            break;

          // collection
          case 1:
            await processItems(key, schema[key].items, form);
            break;

          // primitive
          case 0:
            form[key] = schema[key]?.default ?? "";
            break;

          default:
            console.log("missing type in form builder for key: ", key);
            break;
        }
      }
      return form;
    } catch (error) {
      console.log("error building form: ", error);
    }
  };

  const defaultForm = await buildForm(defaultState);
  return {
    source: baseType?.source,
    form: {
      values: defaultForm,
      _defaults: defaultForm,
      schema: defaultState,
    },
    list: {
      items: [],
      ...(baseType?.list?.perPage?.default && {
        itemsPerPage: baseType.list?.perPage.default,
      }),
      ...(baseType?.list?.perPage?.options && {
        itemsPerPageArray: baseType.list?.perPage.options,
      }),
      filtersCount: 0,
      ...(baseType?.list?.views && {
        views: baseType.list?.views,
      }),
      ...(baseType?.list?.sort && {
        sort: baseType.list?.sort,
      }),
      // CHEICK TOMORROW
      view: defaultView,
      ...(defaultView?.name && { view: defaultView.name }),
      filters: {
        years: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
        ...baseType?.list?.filters,
      },
      total: 0,
      skip: 0,
      numberOfPages: 0,
      ...(baseType?.list?.perPage?.default && {
        limit: baseType.list?.perPage.default,
      }),
      search: "",
      page: 1,
      // CHEICK TOMORROW
      sortBy: defaultSort && [defaultSort.value[1]],
      sortDesc: defaultSort && [defaultSort.value[0] === "desc"],
      // numberOfPages: 0,
    },
    loading: [],
    current: null,
  };
};

export default createModule;
