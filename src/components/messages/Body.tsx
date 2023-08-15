import useChatInfo from "../../hooks/useChatInfo";
import { PbMessage } from "../../types/types";
import EmptyChatBox from "../ui/EmptyChatBox";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef, useState } from "react";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import getMessageById from "../../actions/getMessageById";
import { pocketbase } from "../../lib/pocketbase";
import { UnsubscribeFunc } from "pocketbase";

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let unsubscribe: UnsubscribeFunc = () => {
      return new Promise(() => {});
    };

    const subscribe = async () => {
      unsubscribe = await pocketbase
        .collection("messages")
        .subscribe("*", async (action) => {
          const newMessage = await getMessageById(action.record.id);

          if (newMessage && chatId === newMessage.chat) {
            setMessages((oldMessages) => {
              if (!oldMessages) {
                return [newMessage];
              }

              if (oldMessages.some((m) => m.id === newMessage.id)) {
                return oldMessages.map((m) =>
                  m.id === newMessage.id ? newMessage : m,
                );
              }

              return [...oldMessages, newMessage];
            });
            scrollToBottom();
          }
        });
    };

    subscribe();

    return () => {
      unsubscribe();
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
      {messages.map((message, i, messagesArr) => {
        let previousMessage: PbMessage | undefined = undefined;
        if (i > 0) {
          previousMessage = messagesArr[i - 1];
        }
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isLastMessage={i === messagesArr.length - 1}
            previousMessage={previousMessage}
          />
        );
      })}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
