import { useState } from "react";
import Messages from "../global";
import { getTabsWebRequests, removeWebRequests } from "../services/web-requests";
import { sendMessageToBackground } from "../services/message";
import Config from "./Config";
import "./App.scss";

type Request = {
  documentId: string;
  documentLifeCycle: string;
  frameId: number;
  frameType: string;
  fromCache: false;
  initiator: string;
  ip: string;
  method: string;
  parentFrameId: number;
  requestId: string;
  statusCode: number;
  tabId: number;
  timeStamp: number;
  type: string;
  url: string;
};

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  async function handleClear() {
    setRequests([]);
    await removeWebRequests();
  }

  async function handleShow() {
    const newRequests = await getTabsWebRequests();
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
      <button onClick={handleShow}>Show</button>
      <button onClick={handleClear}>Clear</button>
      <p>Found: {requests.length} requests</p>
      {requests?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
