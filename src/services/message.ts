import chrome from "webextension-polyfill";
import { Listener } from "../lib/events";
import { Events, createService } from "../lib/service";
import {
  getActiveTab,
  sendMessageToTab,
} from "./tabs";

export enum Message {
  StartWebRequests = "startWebRequests",
  StopWebRequests = "stopWebRequests"
}

const events: Events<Message>[] = [
  ["send", sendMessage],
  ["sendToContent", sendMessageToContent],
];

export const messageService = createService<Message>({
  start,
  stop,
  events,
});

function start(listener: Listener<Message>) {
  chrome.runtime.onMessage.addListener(listener as any);
}

function stop(listener: Listener<Message>) {
  chrome.runtime.onMessage.removeListener(listener as any);
}

async function sendMessage(message: Message) {
  try {
    await chrome.runtime.sendMessage(message);
    return message;
  } catch {
    return "failed";
  }
}

async function sendMessageToContent(message: Message) {
  const tab = await getActiveTab();
  try {
    if (tab?.id) {
      await sendMessageToTab(tab.id, message);
      return message;
    } else {
      return "failed";
    }
  } catch {
    return "errored";
  }
}
