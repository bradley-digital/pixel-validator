import { Query } from "../lib/query";
import { createStore } from "../lib/store";

export type ConfigRule = {
  id: string;
  key: string;
  value: string;
  exclude: boolean;
  contains: boolean;
  regex: boolean;
};

export const configRules = createStore<ConfigRule>("configRule");

export async function getConfigsAsQuery() {
  const query: Query = {};
  const configs = await configRules.getAll();
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
