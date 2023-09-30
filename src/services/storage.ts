import chrome from "webextension-polyfill";
import { createStorage } from "../lib/storage";
import { UpdateInput } from "../lib/store";

export async function defaultClear<T>() {
  await chrome.storage.local.clear();
}

export async function defaultGet<T>(key: string) {
  const data = await chrome.storage.local.get(key);
  return data[key] as T;
}

export async function defaultRemove<T>(key: string) {
  const item = await defaultGet<T>(key);
  await chrome.storage.local.remove(key);
  return item;
}

export async function defaultSet<T>(key: string, value: UpdateInput<T>) {
  await chrome.storage.local.set({ [key]: value });
  return value as T;
}

export function startStorage(listener: (change: any) => void) {
  chrome.storage.local.onChanged.addListener(listener);
}

export function stopStorage(listener: (change: any) => void) {
  chrome.storage.local.onChanged.removeListener(listener);
}
