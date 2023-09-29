import chrome from "webextension-polyfill";
import { v4 as uuid } from "uuid";

export async function getLocal(key: string) {
  const data = await chrome.storage.local.get(key);
  return data[key];
}

export async function setLocal(key: string, value: any) {
  return chrome.storage.local.set({ [key]: value });
}

export async function removeLocal(key: string) {
  return chrome.storage.local.remove(key);
}

export async function clearLocal() {
  return chrome.storage.local.clear();
}

/*
 * Creates a store that uses this structure
 * {
 *   [key]: ids[],
 *   [`${key}-${id}`]: value,
 * }
 *
 * TODO: abstract Ids as createIdStore
 */
export function createStore(key: string) {

  function k(id: string) {
    if (id.startsWith(`${key}-`)) return id;
    return `${key}-${id}`;
  }

  async function getIds() {
    let ids = await getLocal(key);
    if (!Array.isArray(ids)) ids = [];
    return ids;
  }

  async function getItem(id: string) {
    return getLocal(k(id));
  }

  async function getItems() {
    const items = [];
    const ids = await getIds();
    for await (const id of ids) {
      const item = await getItem(id);
      items.push(item);
    }
    return items;
  }

  async function queryItems(query: { [key: string]: string }) {
    const items = await getItems();
    return queryObjects(items, query);
  }

  async function removeId(id: string) {
    const ids = await getIds();
    const newIds = ids.filter((i: string) => i !== id);
    return setLocal(key, ids);
  }

  async function removeItem(id: string) {
    await removeId(id);
    return removeLocal(k(id));
  }

  async function removeItems() {
    const ids = await getIds();
    for await (const id of ids) {
      await removeLocal(id);
    }
    return removeLocal(key);
  }

  async function setId(id: string) {
    const ids = await getIds();
    ids.push(k(id));
    return setLocal(key, ids);
  }

  async function setItem(item: any) {
    const id = uuid();
    await setId(id);
    await setLocal(k(id), item);
    return k(id);
  }

  async function updateItem(id: string, input: any) {
    const item = await getItem(id);
    const newItem = { ...item, ...input };
    return setLocal(k(id), newItem);
  }

  return {
    getItem,
    getItems,
    queryItems,
    removeItem,
    removeItems,
    setItem,
    updateItem,
  };
}

function queryObjects(obj: any[], query: { [key: string]: string }) {
  return obj.filter((item: any) => {
    if (item && typeof item === "object") {
      return Object.keys(query).some((key) => (
        typeof item === "object"
        && typeof item[key] !== "undefined"
        && item[key] === query[key]
      ));
    }
  }); 
}
