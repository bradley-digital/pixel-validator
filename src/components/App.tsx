import { useEffect, useState } from "react";
import { registerListener, removeListener } from "../lib/web-requests";
import "./App.scss";

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    function handleChange(details: any) {
      const req = [...requests];
      req.push(details);
      setRequests(req);
    }

    registerListener(handleChange);

    return () => removeListener(handleChange);
  }, [requests, setRequests]);

  return (
    <div>
      <h1>Requests</h1>
      {requests?.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
