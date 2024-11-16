import type { FC, HTMLAttributes, LiHTMLAttributes } from "react";
import { Sender } from "../interfaces/interfaces";

interface MessageProps extends LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  sender: Sender;
}

export const Message: FC<MessageProps> = ({ children, sender, ...props }) => {
  return (
    <li
      className={` ${
        sender === "ai" ? "ml-10 bg-gray-400" : "bg-cyan-500 max-w-xl w-max"
      } py-5 my-5 px-10 rounded-lg `}
      {...props}
    >
      {children}
    </li>
  );
};

export const AIMessage: FC<MessageProps> = ({ children, ...props }) => {
  return (
    <li className="pl-10" {...props}>
      {children}
    </li>
  );
};
