import chrome from "webextension-polyfill";
import { createStore } from "../lib/store";

export type WebRequest = {
  documentId: string;
  documentLifeCycle: string;
  frameId: number;
  frameType: string;
  fromCache: false;
  initiator: string;
  ip: string;
  method: string;
  parentFrameId: number;
  requestId: string;
  statusCode: number;
  tabId: number;
  timeStamp: number;
  type: string;
  url: string;
};

export const webRequests = createStore<WebRequest>("webRequest");

async function defaultListener(details: any) {
  await webRequests.set(details);
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
