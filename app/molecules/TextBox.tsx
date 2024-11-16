import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { sendMessage } from "../api/api";

interface TextBoxProps {
  chatId: string;
}

export const TextBox: FC<TextBoxProps> = ({ chatId }) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const sendMessageMutation = useMutation({
    mutationFn: (payload: { chatId: string; messageText: string }) =>
      sendMessage(payload),
    onMutate: () => {
      setIsWaiting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
    onSettled: () => {
      setIsWaiting(false);
    },
    onError: () => {
      setIsWaiting(false);
    },
  });

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }
    sendMessageMutation.mutate({ chatId, messageText: trimmedMessage });
    setMessage("");
  };

  return (
    <div
      className={`${
        isWaiting && "pointer-events-auto"
      } backdrop-blur-sm row-start-11 row-end-13 bg-white/30 sticky bottom-0 w-full box-border grid grid-cols-12 grid-rows-3 gap-x-4 py-5 px-8`}
    >
      <textarea
        className="resize-none col-start-1 col-end-12 row-start-1 row-end-4 px-5 py-5 rounded-md"
        name="message"
        id="user_message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isWaiting}
      ></textarea>
      <button
        disabled={message.trim().length === 0 || isWaiting}
        onClick={handleSendMessage}
        className={`disabled:bg-gray-400 disabled:opacity-60 row-start-2 flex items-center justify-center bg-white rounded-xl`}
      >
        <span>SEND</span>
        <svg
          className="block w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};
