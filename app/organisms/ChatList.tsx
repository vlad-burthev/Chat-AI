import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChat, deleteChat, getChats } from "../api/api";

export default function ChatList({
  onChatClick,
}: {
  onChatClick: (id: string) => void;
}) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>Ошибка: {error.message}</p>;

  const chats = data || [];

  return (
    <div className="">
      <div className="sticky pt-4 px-4 top-0 bg-gray-500">
        <button
          onClick={() => createChatMutation.mutate()}
          className=" bg-indigo-500 w-full text-white py-2 rounded-md mb-7"
        >
          Add chat
        </button>
      </div>
      <ul className="flex flex-col gap-3 px-4 pt-5">
        {chats.map((chat: { id: string; autoIncrementId: number }) => (
          <li
            key={chat.id}
            className="cursor-pointer relative text-white flex w-full justify-between p-4 items-center bg-blue-400 rounded-md"
            onClick={() => onChatClick(chat.id)}
          >
            <span>Чат {chat.autoIncrementId}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChatMutation.mutate(chat.id);
              }}
              className="bg-red-600 block p-2 rounded-md absolute right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" stroke-white block w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
