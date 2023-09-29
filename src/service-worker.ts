import chrome from "webextension-polyfill";

//import { setWebRequest, removeWebRequests } from "./lib/web-requests";
//
//async function handleWebRequest(details: any) {
//  await setWebRequest(details);
//}
//chrome.webRequest.onCompleted.addListener(handleWebRequest, { urls: ["<all_urls>"] });
//
//async function handleTab(tabId: number, changeInfo: any, tab: any) {
//  if (changeInfo?.status == 'complete') {
//    removeWebRequests();
//  }
//}
//chrome.tabs.onUpdated.addListener(handleTab)
