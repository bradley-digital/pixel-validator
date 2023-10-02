/*
 * TODO: add ability to query using stringified objects
 */

export type Query = {
  [key: string]: QueryValue | {
    value: QueryValue,
    options?: QueryOptions,
  };
};

type QueryValue = string | number | undefined;

type QueryOptions = {
  exclude?: boolean;
  contains?: boolean;
  regex?: boolean;
};

export function queryObjects(obj: any[], query: Query) {
  return obj.filter((item: any) => {
    if (!item || typeof item !== "object") return false;

    return Object.keys(query).every((key) => {
      let result = true;
      try {
        if (typeof item !== "object") return false;
        if (typeof item[key] === "undefined") return false;

        const q = query[key];
        const v = `${item[key]}`;

        if (typeof q === "string") {
          result = v === `${q}`;
        } else if (typeof q === "object" && q?.value) {
          const qv = `${q?.value}`;
          if (q?.options) {
            if (q?.options?.contains) {
              result = v.includes(qv);
            } else if (q?.options?.regex) {
              result = new RegExp(qv, "ig").test(v);
            }
            if (q?.options?.exclude) {
              result = !result;
            }
          } else {
            result = v === qv;
          }
        }
      } catch (err) {
        result = false;
      }
      return result;
    });
  }); 
}

