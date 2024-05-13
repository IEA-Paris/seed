import { Form } from "~/data/form";
import completeSchema from "../utils/scripts/completeSchema";
import Model from "~/data/model";
import { Sort, Views } from "~/data/list";

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
  form: CustomForm;
  list: List;
  loading: any[];
  current: any;
}

const createModule = async (type: string): Promise<ModuleType> => {
  console.log("CREATING MODULE FOR: ", type);
  const baseType: Model = (await import(`../data/${type}.ts`)).default;
  const baseSchema: Record<string, Form> = baseType.form;
  const defaultState: Record<string, Form> = await completeSchema(baseSchema);
  console.log("defaultState", defaultState);

  const defaultViewKey: string | undefined =
    baseType.list.views &&
    Object.keys(baseType.list.views).find((item) => {
      baseType.list.views[item]?.default === true;
    });
  const defaultView =
    defaultViewKey !== undefined
      ? baseType.list.views[defaultViewKey]
      : undefined;

  const defaultSortKey: string | undefined =
    baseType.list.sort &&
    Object.keys(baseType.list.sort).find((item) => {
      baseType.list.sort[item].default === true;
    });

  const defaultSort: Sort | undefined =
    defaultSortKey !== undefined
      ? baseType.list.sort[defaultSortKey]
      : undefined;

  const buildForm = async (
    schema: Record<string, Form>
  ): Promise<Record<string, Form> | undefined> => {
    try {
      // REFACTOR LATER
      let form: { [key: string]: any } = {};
      for await (const key of Object.keys(schema)) {
        /* console.log("key: ", key) */
        /* console.log("schema[key]: ", schema[key]) */
        // if we deal with a template, import it dynamically
        if (schema[key]?.type === 3) {
          const templateForm: Record<string, Form> = (
            await import(`../data/${key}.ts`)
          ).default.form;
          /* console.log("templateState: ", templateState) */
          form[key] = await buildForm(templateForm);
          // if it has items, it is either an object or a collection
        } else if (schema[key]?.items) {
          // only collection have items with an array type
          if (Array.isArray(schema[key]?.items)) {
            // if (!form[key]) form[key] = [{}];
            if (!form[key]) {
              form[key] = [{}];
            }
            for await (const item of schema[key]?.items) {
              form[key][0] = {
                ...form[key][0],
                ...(await buildForm({ [item.key]: item })),
              };
            }
            // else it's an object
          } else {
            if (!form[key]) form[key] = {};
            for await (const subkey of Object.keys(schema[key].items)) {
              form[key] = {
                ...form[key],
                ...(await buildForm({ [subkey]: schema[key].items[subkey] })),
              };
            }
          }
        } else {
          form[key] = schema[key]?.default ?? "";
        }
      }
      return form;
    } catch (error) {
      console.log("error building form: ", error);
    }
  };
  const defaultForm = await buildForm(defaultState);

  return {
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
