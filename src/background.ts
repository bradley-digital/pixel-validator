import chrome from "webextension-polyfill";
import { Listener } from "./lib/events";
import { queryObjects } from "./lib/query";
import { getConfigsAsQuery } from "./services/config";
import { Message, messageService } from "./services/message";
import { WebRequest, webRequestStore, webRequestService } from "./services/web-requests";

async function webListener(details: WebRequest) {
  const query = await getConfigsAsQuery();
  const result = queryObjects([details], query);
  if (result[0]) await webRequestStore.set(details);
}

function unpackMessages(messages: any) {
  const message = messages[0];
  if (typeof message !== "string") return "";
  return message;
}

messageService.use(unpackMessages);

messageService.start((message) => {
  switch (message) {
    case Message.StartWebRequests:
      webRequestService.start(webListener);
      break;
    case Message.StopWebRequests:
      webRequestService.stop(webListener);
      break;
    default:
      console.log("Uncaught message:", message);
  }
});
