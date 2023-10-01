import chrome from "webextension-polyfill";

export async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tabs[0]) {
    return tabs[0];
  } else {
    throw new Error("No active tab found");
  }
}

export async function getActiveTabs() {
  return chrome.tabs.query({ active: true });
}

export async function sendMessageToTab(id: number, message: any) {
  return chrome.tabs.sendMessage(id, message);
}
