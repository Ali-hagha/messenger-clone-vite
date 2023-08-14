import useChatInfo from "../../hooks/useChatInfo";
import { pocketbase } from "../../lib/pocketbase";
import { PbMessage } from "../../types/types";
import EmptyChatBox from "../ui/EmptyChatBox";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef, useState } from "react";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import getMessageById from "../../actions/getMessageById";

interface Props {
  initialMessages: PbMessage[];
}

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState<PbMessage[] | null>(null);
  const { chatId } = useChatInfo();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // axios.post(`/api/conversations/${conversationId}/seen`);
    scrollToBottom();
  }, [chatId, messages]);

  useEffect(() => {
    pocketbase.collection("messages").subscribe("*", async (action) => {
      const newMessage = await getMessageById(action.record.id);

      if (newMessage && chatId === newMessage.chat) {
        setMessages((oldMessages) => {
          if (!oldMessages) {
            return [newMessage];
          }

          if (oldMessages.some((m) => m.id === newMessage.id)) {
            return oldMessages;
          }

          scrollToBottom();
          return [...oldMessages, newMessage];
        });
      }
    });

    return () => {
      pocketbase.collection("messages").unsubscribe();
    };
  }, [chatId]);

  if (messages === null) {
    return <MessagesSkeleton />;
  }

  if (messages.length === 0) {
    return <EmptyChatBox label="No messages here yet..." />;
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto pt-16">
      {messages.map((message, i) => (
        <MessageBubble
          key={message.id}
          message={message}
          isLastMessage={i === messages.length - 1}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
