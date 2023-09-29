import chrome from "webextension-polyfill";

export async function getActiveTabs() {
  return chrome.tabs.query({ active: true, currentWindow: true });
}

export async function sendMessageToTab(id: number, message: any) {
  return chrome.tabs.sendMessage(id, message);
}

