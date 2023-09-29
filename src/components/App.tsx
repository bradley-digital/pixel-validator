import { useEffect, useState } from "react";
import chrome from "webextension-polyfill";
import "./App.scss";

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  async function handleStorageChange(changes: any, areaName: string) {
    const newRequests = changes?.webRequests?.newValue; 
    if (Array.isArray(newRequests)) {
      setRequests(newRequests);
    }
  }

  return (
    <div>
      <h1>Requests</h1>
      {requests.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  )
  ;
}
