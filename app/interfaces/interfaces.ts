export type Sender = "sender" | "ai";

export interface Message {
  id: string;
  sender: Sender;
  message: string;
}

export interface Chat {
  id: string;
  messages: Message[];
}
