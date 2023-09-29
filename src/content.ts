import type { Runtime } from "webextension-polyfill";
import chrome from "webextension-polyfill";

function log(data: any) {
  console.log(JSON.stringify(data));
}

async function handleMessage(message: any, sender: Runtime.MessageSender) {
  log({ message, sender });
}
chrome.runtime.onMessage.addListener(handleMessage);

//async function handleStorageChange(changes: object, areaName: string) {
//  log({ changes, areaName });
//}
//chrome.storage.onChanged.addListener(handleStorageChange);
