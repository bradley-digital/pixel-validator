import chrome from "webextension-polyfill";

import { setWebRequest } from "./lib/web-requests";

async function handleWebRequestCompleted(webRequest: any) {
  await setWebRequest(webRequest);
}

chrome.webRequest.onCompleted.addListener(
  handleWebRequestCompleted,
  { urls: ["<all_urls>"] },
);
