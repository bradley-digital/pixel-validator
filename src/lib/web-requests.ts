import chrome from "webextension-polyfill";
import {
  getLocal,
  setLocal,
  removeLocal,
} from "./storage";

const k = "webRequests";

export async function getWebRequests() {
  return getLocal(k);
}

export async function setWebRequest(value: any) {
  let data: any = [];
  const existing = await getWebRequests();
  if (Array.isArray(existing)) {
    data = existing;
  }
  data.push(value);
  return setLocal(k, data);
}

export async function removeWebRequests() {
  return removeLocal(k);
}

export function registerListener(listener: (details: any) => void) {
  chrome.webRequest.onCompleted.addListener(listener, { urls: ["<all_urls>"] });
  chrome.webRequest.onBeforeRedirect.addListener(listener, { urls: ["<all_urls>"] });
  chrome.webRequest.onErrorOccurred.addListener(listener, { urls: ["<all_urls>"] });
}

export function removeListener(listener: (details: any) => void) {
  chrome.webRequest.onCompleted.removeListener(listener);
  chrome.webRequest.onBeforeRedirect.removeListener(listener);
  chrome.webRequest.onErrorOccurred.removeListener(listener);
}
