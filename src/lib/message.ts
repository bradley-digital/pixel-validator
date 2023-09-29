import {
  getActiveTab,
  sendMessageToTab,
} from "./tabs";

export async function sendMessageToBackground(message: any) {
  try {
    const response = chrome.runtime.sendMessage(message);
    return response;
  } catch {
    return { status: "err" };
  }
}

export async function sendMessageToContent(message: any) {
  const tab = await getActiveTab();
  try {
    if (tab?.id) {
      const response = await sendMessageToTab(tab.id, message);
      return response;
    } else {
      return { status: "fail" };
    }
  } catch {
    return { status: "err" };
  }
}

export async function sendMessageToPopup(message: any) {
  try {
    const response = chrome.runtime.sendMessage(message);
    return response;
  } catch {
    return { status: "err" };
  }
}
