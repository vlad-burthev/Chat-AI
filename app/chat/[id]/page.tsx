"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/chats/${id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages));
    }
  }, [id]);

  return (
    <main style={{ flex: 1, padding: "1rem" }}>
      {id ? (
        <div>
          <h1>Chat ID: {id}</h1>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Выберите чат, чтобы начать общение.</p>
      )}
    </main>
  );
}
