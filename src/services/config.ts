import { createStore } from "./storage";
import { getActiveTab } from "./tabs";
import { Query, queryObjects } from "../lib/query";

export type ConfigRule = {
  id: string;
  key: string;
  value: string;
  exclude: boolean;
  contains: boolean;
  regex: boolean;
};

export type ConfigUpdateInput = Partial<ConfigRule>;

const {
  getItems,
  queryItems,
  removeItem,
  removeItems,
  setItem,
  updateItem,
} = createStore("config");

export async function getConfigs() {
  return getItems();
}

export async function getConfigsAsQuery() {
  const query: Query = {};
  const configs = await getConfigs() as unknown as ConfigRule[];
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

export async function queryConfigs(query: any) {
  return queryItems(query);
}

export async function removeConfig(id: string) {
  return removeItem(id);
}

export async function removeConfigs() {
  return removeItems();
}

export async function setConfig(input: any) {
  const copy = { ...input };
  if (copy.id) delete copy.id;
  return setItem(copy);
}

export async function updateConfig(id: string, input: ConfigUpdateInput) {
  const copy = { ...input };
  if (copy.id) delete copy.id;
  return updateItem(id, copy);
}

