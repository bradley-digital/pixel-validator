import { useState } from "react";
import Messages from "../messages";
import { getDomain } from "../lib/url";
import { getActiveTab } from "../lib/tabs";
import { getWebRequests, removeWebRequests } from "../lib/web-requests";
import { sendMessageToBackground } from "../lib/message";
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

  async function handleRefresh() {
    const reqs = await getWebRequests();
    const activeTab = await getActiveTab();
    const tabDomain = getDomain(activeTab?.url);

    const newRequests = reqs.filter((req: any) => {
      const reqDomain = getDomain(req?.url);
      const isSameTab = activeTab?.id === req?.tabId;
      const isSameDomain = tabDomain === reqDomain;
      if (isSameTab && !isSameDomain) {
        return true;
      }
    });
    setRequests(newRequests);
  }

  async function handleStart() {
    await sendMessageToBackground(Messages.RegisterWebRequests);
  }

  async function handleStop() {
    await sendMessageToBackground(Messages.RemoveWebRequests);
  }

  return (
    <div>
      <h1>External Requests</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={removeWebRequests}>Clear</button>
      <p>Found: {requests.length} requests</p>
      {requests?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
