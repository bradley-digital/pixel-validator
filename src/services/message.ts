import type { Runtime } from "webextension-polyfill";
import Messages from "../global";
import {
  getActiveTab,
  sendMessageToTab,
} from "./tabs";

export async function sendMessageToBackground(message: any) {
  try {
    const response = chrome.runtime.sendMessage(message);
    return response;
  } catch {
    return Messages.SendMessageErrored;
  }
}

export async function sendMessageToContent(message: any) {
  const tab = await getActiveTab();
  try {
    if (tab?.id) {
      const response = await sendMessageToTab(tab.id, message);
      return response;
    } else {
      return Messages.SendMessageFailed;
    }
  } catch {
    return Messages.SendMessageErrored;
  }
}

export async function sendMessageToPopup(message: any) {
  try {
    const response = chrome.runtime.sendMessage(message);
    return response;
  } catch {
    return Messages.SendMessageErrored;
  }
}

export function startMessage(listener: (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse?: (response?: any) => void
) => void) {
  chrome.runtime.onMessage.addListener(listener);
}

export function stopMessage(listener: (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse?: (response?: any) => void
) => void) {
  chrome.runtime.onMessage.removeListener(listener);
}
