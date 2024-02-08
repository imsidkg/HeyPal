"use client";
import { FC, useRef, useState } from "react";

interface MessagesProps {
  initalMessages: Messages[];
  sessionId: string;
}

const Messages: FC<MessagesProps> = ({ initalMessages, sessionId }) => {
  const [messages, setMessages] = useState<Messages[]>(initalMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;
        const hasNextMessagesFromSameUSer =
          messages[index - 1].senderId === messages[index].senderId;
        return <div></div>;
      })}
    </div>
  );
};

export default Messages;
