import chrome from "webextension-polyfill";

export async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

export async function getActiveTabs() {
  return chrome.tabs.query({ active: true });
}

export async function sendMessageToTab(id: number, message: any) {
  return chrome.tabs.sendMessage(id, message);
}

