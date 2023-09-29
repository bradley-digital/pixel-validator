import { useEffect, useState } from "react";
import { registerListener, removeListener } from "../lib/web-requests";
import "./App.scss";

export default function App() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    function register() {
      registerListener(handleChange);
    }
    function remove() {
      removeListener(handleChange);
    }
    window.addEventListener("onload", register);
    window.addEventListener("unload", remove);

    return () => {
      window.removeEventListener("onload", register);
      window.removeEventListener("unload", remove);
    };
  }, []);

  function handleChange(details: any) {
    console.log(details);
    if (!details) return;
    const newRequests = [...requests]; 
    newRequests.push(details);
    setRequests(newRequests);
  }

  return (
    <div>
      <h1>Requests</h1>
      {requests.map((request: any) => (
        <p>{request?.method} {request?.url}</p>
      ))}
    </div>
  );
}
