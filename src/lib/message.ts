import {
  getActiveTabs,
  sendMessageToTab,
} from "./tabs";

export async function sendMessage(message: any) {
  const responses: any[] = [];
  const tabs = await getActiveTabs();
  for await (const tab of tabs) {
    const id = tab?.id || 0;
    const response = await sendMessageToTab(id, message);
    responses.push({ id, response });
  }
  return responses;
}

