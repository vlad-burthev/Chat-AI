import type { FC } from "react";
import { getChat } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import type { Chat } from "../interfaces/interfaces";
import { Message } from "../molecules/Message";

interface ChatProps {
  selectedChat: string;
}

const Chat: FC<ChatProps> = ({ selectedChat }) => {
  const { data, error, isLoading, refetch } = useQuery<Chat>({
    queryKey: ["chat", selectedChat],
    queryFn: () => getChat(selectedChat),
    refetchInterval: 3000,
    staleTime: 0,
  });

  if (isLoading) {
    return <div>Loading chat...</div>;
  }

  if (error) {
    return <div>Failed to load chat: {error.toString()}</div>;
  }

  return (
    <div className="overflow-y-auto h-screen pb-40 px-10">
      <h1>Chat ID: {selectedChat}</h1>
      <ul>
        {data?.messages &&
          data.messages.map(({ id, message, sender }) => (
            <Message sender={sender} key={id}>
              {message}
            </Message>
          ))}
      </ul>
    </div>
  );
};

export default Chat;
