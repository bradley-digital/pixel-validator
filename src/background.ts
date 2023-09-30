import chrome from "webextension-polyfill";
import Messages from "./global";
import { queryObjects } from "./lib/query";
import { getConfigsAsQuery } from "./services/config";
import { startMessage, stopMessage } from "./services/message";
import { setWebRequest, startWebRequest, stopWebRequest } from "./services/web-requests";

async function listener(details: any) {
  const query = await getConfigsAsQuery();
  const result = queryObjects([details], query);
  if (result[0]) await setWebRequest(details);
}

startMessage((message) => {
  if (message.event === Messages.StartWebRequests.event) {
    startWebRequest(listener);
  }
  if (message.event === Messages.StopWebRequests.event) {
    stopWebRequest(listener);
  }
});
