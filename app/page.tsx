"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import ChatList from "./organisms/ChatList";
import { useState, useEffect } from "react";
import { getChat } from "./api/api";
import Chat from "./organisms/Chat";
import { TextBox } from "./molecules/TextBox";

const queryClient = new QueryClient();

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <aside className=" bg-gray-500 w-2/12">
          <ChatList onChatClick={handleChatClick} />
        </aside>

        <main className=" w-10/12 ">
          {selectedChatId ? (
            <div className="grid relative grid-rows-12 h-full">
              <Chat selectedChat={selectedChatId} />
              <TextBox chatId={selectedChatId} />
            </div>
          ) : (
            <p>Выберите чат или создайте новый</p>
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}
