import type { Runtime } from "webextension-polyfill";
import chrome from "webextension-polyfill";
import Messages from "./messages";
import { registerListener, removeListener } from "./lib/web-requests";

async function handleMessage(message: any, sender: Runtime.MessageSender) {
  if (message === Messages.RegisterWebRequests) {
    registerListener();
  }
  if (message === Messages.RemoveWebRequests) {
    removeListener();
  }
}
chrome.runtime.onMessage.addListener(handleMessage);
