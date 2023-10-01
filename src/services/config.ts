import { Query } from "../lib/query";
import { createStore } from "../lib/store";

export type Config = {
  id: string;
  key: string;
  value: string;
  exclude: boolean;
  contains: boolean;
  regex: boolean;
};

export const configStore = createStore<Config>("config");

export async function getConfigsAsQuery() {
  const query: Query = {};
  const configs = await configStore.getAll();
  for (const config of configs) {
    query[config.key] = {
      value: config.value,
      options: {
        exclude: config.exclude,
        contains: config.contains,
        regex: config.regex,
      },
    };
  }
  return query;
};
