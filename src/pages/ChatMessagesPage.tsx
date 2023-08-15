import Header from "../components/messages/header/Header";
import { Suspense } from "react";
import Body from "../components/messages/Body";
import MessageForm from "../components/messages/MessageForm";
import { Await, Navigate, useLoaderData } from "react-router-dom";
import { PbChat, PbMessage } from "../types/types";
import MessagesSkeleton from "../components/skeletons/MessagesSkeleton";
import ChatHeaderSkeleton from "../components/skeletons/ChatHeaderSkeleton";
import useDocumentHeight from "../hooks/useDocumentHeight";

const ChatMessagesPage = () => {
  const height = useDocumentHeight();
  const { chat, messages } = useLoaderData() as {
    chat: Promise<PbChat | null>;
    messages: Promise<PbMessage[] | never[]>;
  };

  return (
    <div
      className="relative flex flex-1 flex-col bg-chat-gradient bg-cover"
      style={{ height }}
    >
      <Suspense fallback={<ChatHeaderSkeleton />}>
        <Await resolve={chat} errorElement={<Navigate to={"../chats"} />}>
          {(resolvedChat: PbChat) => <Header chat={resolvedChat} />}
        </Await>
      </Suspense>

      <Suspense fallback={<MessagesSkeleton />}>
        <Await resolve={messages} errorElement={<Navigate to={"../chats"} />}>
          {(resolvedMessages: PbMessage[]) => (
            <Body initialMessages={resolvedMessages} />
          )}
        </Await>
      </Suspense>

      <MessageForm />
    </div>
  );
};

export default ChatMessagesPage;
