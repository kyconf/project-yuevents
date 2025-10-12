"use client";
import { useState } from "react";

export default function Home() {
  const [pong, setPong] = useState("PING");
  async function ping() {
    try {
      const response = await fetch("http://127.0.0.1:8000/ping", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPong(data);
      return data; // JSON from FastAPI, e.g., { message: "pong" }
    } catch (error) {
      console.error("Ping failed:", error);
      return null;
    }
  }

  return (
    <div className="">
      <button onClick={ping}>Click Me Sir</button>
      <span>{pong}</span>
    </div>
  );
}
