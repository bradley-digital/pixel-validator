import { useEffect, useState } from "react";
import Messages from "../global";
import { useStore } from "../hooks/use-store";
import { WebRequest, webRequests } from "../services/web-requests";
import { sendMessageToBackground } from "../services/message";
import Config from "./Config";
import "./App.scss";

export default function App() {
  const webRequestsStore = useStore<WebRequest>(webRequests);

  async function handleStart() {
    await sendMessageToBackground(Messages.StartWebRequests);
  }

  async function handleStop() {
    await sendMessageToBackground(Messages.StopWebRequests);
  }

  return (
    <div>
      <h1>Pixel Validator</h1>
      <Config />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={webRequestsStore.getAll}>Refresh</button>
      <button onClick={webRequestsStore.removeAll}>Clear</button>
      <p>Found: {webRequestsStore.state.length} requests</p>
      {webRequestsStore.state?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
