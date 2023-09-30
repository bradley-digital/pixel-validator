/*
 * createStore uses this structure under the hood
 * {
 *   [key]: ids[],
 *   [id]: value,
 * }
 *
 * TODO: Add ability to generate indexes
 */

import chrome from "webextension-polyfill";
import { v4 as uuid } from "uuid";
import { Query, queryObjects } from "../lib/query";

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

export function createIdStore(key: string) {
  async function getIds() {
    let ids = await getLocal(key);
    if (!Array.isArray(ids)) ids = [];
    return ids;
  }

  async function removeId(id: string) {
    const ids = await getIds();
    const newIds = ids.filter((i: string) => i !== id);
    return setLocal(key, ids);
  }

  async function setId(id: string) {
    const ids = await getIds();
    ids.push(id);
    return setLocal(key, ids);
  }

  return {
    getIds,
    setId,
    removeId,
  };
}

export function createStore(key: string) {
  const {
    getIds,
    removeId,
    setId,
  } = createIdStore(key);

  async function getItem(id: string) {
    return getLocal(id);
  }

  async function getItems() {
    const items = [];
    const ids = await getIds();
    for await (const id of ids) {
      const item = await getItem(id);
      item.id = id;
      items.push(item);
    }
    return items;
  }

  async function queryItems(query: Query) {
    const items = await getItems();
    return queryObjects(items, query);
  }

  async function removeItem(id: string) {
    await removeId(id);
    return removeLocal(id);
  }

  async function removeItems() {
    const ids = await getIds();
    for await (const id of ids) {
      await removeLocal(id);
    }
    return removeLocal(key);
  }

  async function setItem(item: any) {
    const id = uuid();
    await setId(id);
    await setLocal(id, item);
    return id;
  }

  async function updateItem(id: string, input: any) {
    const item = await getItem(id);
    const newItem = { ...item, ...input };
    return setLocal(id, newItem);
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

export function startStorage(listener: (change: any) => void) {
  chrome.storage.local.onChanged.addListener(listener);
}

export function stopStorage(listener: (change: any) => void) {
  chrome.storage.local.onChanged.removeListener(listener);
}
