import chrome from "webextension-polyfill";
import { createStore } from "./storage";
import { getActiveTab } from "./tabs";
import { queryObjects } from "../lib/query";

const {
  getItems,
  queryItems,
  removeItem,
  removeItems,
  setItem,
  updateItem,
} = createStore("webRequests");

export async function getWebRequests() {
  return getItems();
}

export async function getTabsWebRequests() {
  const activeTab = await getActiveTab();
  return queryWebRequests({
    tabId: activeTab?.id,
  });
}

export async function queryWebRequests(query: any) {
  return queryItems(query);
}

export async function removeWebRequest(id: string) {
  return removeItem(id);
}

export async function removeWebRequests() {
  return removeItems();
}

export async function setWebRequest(value: any) {
  return setItem(value);
}

export async function updateWebRequest(id: string, value: any) {
  return updateItem(id, value);
}

async function defaultListener(details: any) {
  await setWebRequest(details);
}

export function startWebRequest(listener: (details: any) => void = defaultListener) {
  chrome.webRequest.onCompleted.addListener(listener, { urls: ["<all_urls>"] });
  chrome.webRequest.onBeforeRedirect.addListener(listener, { urls: ["<all_urls>"] });
  chrome.webRequest.onErrorOccurred.addListener(listener, { urls: ["<all_urls>"] });
}

export function stopWebRequest(listener: (details: any) => void = defaultListener) {
  chrome.webRequest.onCompleted.removeListener(listener);
  chrome.webRequest.onBeforeRedirect.removeListener(listener);
  chrome.webRequest.onErrorOccurred.removeListener(listener);
}
