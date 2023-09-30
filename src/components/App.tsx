import { useEffect, useState } from "react";
import Messages from "../global";
import { getWebRequests, removeWebRequests } from "../services/web-requests";
import { sendMessageToBackground } from "../services/message";
import Config from "./Config";
import "./App.scss";

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function init() {
      const storedRequests = await getWebRequests();
      setRequests(storedRequests);
    }
    init();
  }, []);

  async function handleClear() {
    setRequests([]);
    await removeWebRequests();
  }

  async function handleRefresh() {
    const newRequests = await getWebRequests();
    setRequests(newRequests);
  }

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
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleClear}>Clear</button>
      <p>Found: {requests.length} requests</p>
      {requests?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
