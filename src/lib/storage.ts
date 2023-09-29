import chrome from "webextension-polyfill";

export async function getLocal(key: string) {
  const data = await chrome.storage.local.get(key);
  return data[key];
}

export async function setLocal(key: string, value: any) {
  return chrome.storage.local.set({ [key]: value });
}

