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
  return details;
}

function unpackMessages(messages: Message[]) {
  const message = messages[0];
  if (typeof message !== "string") return "";
  return message;
}

webRequestService.use(webListener);
messageService.use(unpackMessages);

messageService.start((message) => {
  switch (message) {
    case Message.StartWebRequests:
      webRequestService.start();
      break;
    case Message.StopWebRequests:
      webRequestService.stop();
      break;
    default:
      console.log("Uncaught message:", message);
  }
});
