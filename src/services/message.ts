import chrome from "webextension-polyfill";
import { Listener } from "../lib/events";
import { createEmitter } from "../lib/events";
import { createService } from "../lib/service";
import {
  getActiveTab,
  sendMessageToTab,
} from "./tabs";

export enum Message {
  StartWebRequests = "startWebRequests",
  StopWebRequests = "stopWebRequests"
}

export const messageService = createService<Message>({
  start,
  stop,
});

export const messageEmitter = createEmitter<Message>({
  send: sendMessage,
  sendToContent: sendMessageToContent,
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
  } catch (err) {
    console.error(err);
  }
}

async function sendMessageToContent(message: Message) {
  try {
    const tab = await getActiveTab();
    await sendMessageToTab(tab.id || 0, message);
  } catch (err) {
    console.error(err);
  }
}
