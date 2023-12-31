import React, { useEffect, useState } from "react";
import { Id, Store, UpdateInput } from "../lib/store";
import { Query } from "../lib/query";

type UseStore<T> = Store<T> & {
  state: T[];
};

export function useStore<T>(store: Store<T>): UseStore<T> {
  const [state, setState] = useState<T[]>([]);

  useEffect(() => {
    getAll();
  }, []);

  async function get(id: string) {
    const item = await store.get(id);
    const newState = [...state];
    newState.push(item);
    return item;
  }

  async function getAll() {
    const newState = await store.getAll();
    setState(newState);
    return newState;
  }

  async function query(query: Query) {
    const newState = await store.query(query);
    setState(newState);
    return newState;
  }

  async function remove(id: string) {
    const newState = state.filter((s) => (s as Id<T>)?.id !== id);
    setState(newState);
    return store.remove(id);
  }

  async function removeAll() {
    setState([]);
    return store.removeAll();
  }

  async function set(input: UpdateInput<T>) {
    const item = await store.set(input);
    const newState = [...state];
    newState.push(item);
    setState(newState);
    return item;
  }

  async function update(input: UpdateInput<T>) {
    if (typeof input === "string") return input as T;
    const id = (input as Id<T>).id || "";
    const existing = state.find((s) => (s as Id<T>)?.id === id);
    const newState = state.filter((s) => (s as Id<T>)?.id !== id);
    const item = { ...existing, ...input } as T;
    newState.push(item);
    setState(newState);
    return store.update(item);
  }

  return {
    get,
    getAll,
    query,
    remove,
    removeAll,
    set,
    state,
    update,
  };
}
