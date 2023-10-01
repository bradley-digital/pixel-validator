import { useEffect, useState } from "react";
import { useStore } from "../hooks/use-store";
import { useEmitter } from "../hooks/use-emitter";
import { WebRequest, webRequestStore  } from "../services/web-requests";
import { Message, messageService } from "../services/message";
import Config from "./Config";
import "./App.scss";

export default function App() {
  const webRequests = useStore<WebRequest>(webRequestStore);
  const messages = useEmitter<Message>(messageService.emitter);

  async function handleStart() {
    await messages.send(Message.StartWebRequests);
  }

  async function handleStop() {
    await messages.send(Message.StopWebRequests);
  }

  return (
    <div>
      <h1>Pixel Validator</h1>
      <Config />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={webRequests.getAll}>Refresh</button>
      <button onClick={webRequests.removeAll}>Clear</button>
      <p>Found: {webRequests.state.length} requests</p>
      {webRequests.state?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
