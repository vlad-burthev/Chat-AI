export const getChats = async () => {
  const response = await fetch("http://localhost:8888/chat/all");
  if (!response.ok) {
    throw new Error("Ошибка при получении чатов");
  }
  return response.json();
};

export const createChat = async () => {
  await fetch("http://localhost:8888/chat/create", {
    method: "POST",
  });
};

export const getChat = async (chatId: string) => {
  const response = await fetch(`http://localhost:8888/chat/${chatId}`);
  return response.json();
};

export const deleteChat = async (id: string) => {
  await fetch(`http://localhost:8888/chat/${id}`, {
    method: "DELETE",
  });
};

export const sendMessage = async ({
  chatId,
  messageText,
}: {
  chatId: string;
  messageText: string;
}) => {
  const response = await fetch(`http://localhost:8888/chat/send_message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageText, chatId }),
  });

  if (!response.ok) {
    throw new Error("Ошибка отправки сообщения");
  }

  return response.json();
};
