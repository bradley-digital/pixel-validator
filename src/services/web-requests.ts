import chrome from "webextension-polyfill";
import { UpdateInput, createStore } from "../lib/store";
import { Listener } from "../lib/events";
import { createService } from "../lib/service";

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

export const webRequestStore = createStore<WebRequest>("webRequest");

export const webRequestService = createService<WebRequest>({
  start,
  stop,
});

function start(listener: Listener<WebRequest>) {
  chrome.webRequest.onCompleted.addListener(listener as any, { urls: ["<all_urls>"] });
  chrome.webRequest.onBeforeRedirect.addListener(listener as any, { urls: ["<all_urls>"] });
  chrome.webRequest.onErrorOccurred.addListener(listener as any, { urls: ["<all_urls>"] });
}

function stop(listener: Listener<WebRequest>) {
  chrome.webRequest.onCompleted.removeListener(listener as any);
  chrome.webRequest.onBeforeRedirect.removeListener(listener as any);
  chrome.webRequest.onErrorOccurred.removeListener(listener as any);
}
