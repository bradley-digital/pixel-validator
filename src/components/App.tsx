import { useEffect, useState } from "react";
import { getActiveTab } from "../lib/tabs";
import { getDomain } from "../lib/url";
import { registerListener, removeListener } from "../lib/web-requests";
import "./App.scss";

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function handleChange(request: any) {
      const activeTab = await getActiveTab();
      const tabDomain = getDomain(activeTab?.url);
      const requestDomain = getDomain(request?.url);

      if (tabDomain !== requestDomain) {
        const req = [...requests];
        req.push(request);
        setRequests(req);
      }
    }

    registerListener(handleChange);

    return () => removeListener(handleChange);
  }, [requests, setRequests]);

  return (
    <div>
      <h1>External Requests</h1>
      {requests?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
