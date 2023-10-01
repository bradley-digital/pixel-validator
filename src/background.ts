import chrome from "webextension-polyfill";
import { queryObjects } from "./lib/query";
import { getConfigsAsQuery } from "./services/config";
import { Message, messageService } from "./services/message";
import { WebRequest, webRequestStore, webRequestService } from "./services/web-requests";

async function webListener(details: WebRequest) {
  const query = await getConfigsAsQuery();
  const result = queryObjects([details], query);
  if (result[0]) await webRequestStore.set(details);
}

messageService.listen((message: Message) => {
  switch (message[0]) {
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
