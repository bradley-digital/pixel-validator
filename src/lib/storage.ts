import chrome from "webextension-polyfill";

export async function getLocal(key: string) {
  const data = await chrome.storage.local.get(key);
  return data[key];
}

export async function setLocal(key: string, value: any) {
  return chrome.storage.local.set({ [key]: value });
}

export async function removeLocal(key: string | string[]) {
  return chrome.storage.local.remove(key);
}

export async function clearLocal() {
  return chrome.storage.local.clear();
}
