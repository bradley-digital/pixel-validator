/*
 * createStore uses this structure
 * {
 *   [key]: ids[],
 *   [id]: value,
 * }
 *
 * TODO: Add ability to generate indexes
 */

import { v4 as uuid } from "uuid";
import { Storage, createStorage } from "./storage";
import { Query, queryObjects } from "./query";

export type IdStore = {
  getAll: () => Promise<string[]>;
  remove: (id: string) => Promise<string>;
  removeAll: () => Promise<string[]>;
  set: () => Promise<string>;
};

export type Store<T> = {
  get: (id: string) => Promise<T>;
  getAll: () => Promise<T[]>;
  query: (query: Query) => Promise<T[]>;
  remove: (id: string) => Promise<T>;
  removeAll: () => Promise<T[]>;
  set: (input: UpdateInput<T>) => Promise<T>;
  update: (input: UpdateInput<T>) => Promise<T>;
};

export type UpdateInput<T> = string |  Partial<T>;
export type Id<T> = Partial<T> & { id: string };

export function createIdStore(key: string): IdStore {

  const storage = createStorage<string[]>();

  async function getAll() {
    let ids = await storage.get(key);
    if (!Array.isArray(ids)) ids = [];
    return ids;
  }

  async function remove(id: string) {
    const ids = await getAll();
    const newIds = ids.filter((i: string) => i !== id) as UpdateInput<string[]>;
    await storage.set(key, newIds);
    return id;
  }

  async function removeAll() {
    const ids = await getAll();
    await storage.remove(key);
    return ids;
  }

  async function set() {
    const id = uuid();
    const ids = await getAll() as UpdateInput<string[]>;
    if (!Array.isArray(ids)) return id;
    ids.push(id);
    await storage.set(key, ids);
    return id;
  }

  return {
    getAll,
    remove,
    removeAll,
    set,
  };
}

export function createStore<T>(key: string): Store<T> {
  const storage = createStorage<T>();
  const ids = createIdStore(key);

  async function get(id: string) {
    return storage.get(id);
  }

  async function getAll() {
    const items: T[] = [];
    const allIds = await ids.getAll();
    for await (const id of allIds) {
      const item = await get(id);
      items.push(item);
    }
    return items;
  }

  async function query(query: Query) {
    const items = await getAll();
    return queryObjects(items, query);
  }

  async function remove(id: string) {
    await ids.remove(id);
    return storage.remove(id);
  }

  async function removeAll() {
    const removedItems: T[] = [];
    const allIds = await ids.getAll();
    for await (const id of allIds) {
      const removedItem = await storage.remove(id);
      removedItems.push(removedItem);
    }
    await ids.removeAll();
    return removedItems;
  }

  async function set(input: UpdateInput<T>) {
    if (typeof input === "string") return input as T;
    const id = await ids.set();
    (input as Id<T>).id = id;
    return storage.set(id, input);
  }

  async function update(input: UpdateInput<T>) {
    if (typeof input === "string") return input as T;
    const item = await get((input as Id<T>).id);
    const updatedItem: UpdateInput<T> = { ...item, ...input };
    return storage.set((input as Id<T>).id, updatedItem);
  }

  return {
    get,
    getAll,
    query,
    remove,
    removeAll,
    set,
    update,
  };
}
