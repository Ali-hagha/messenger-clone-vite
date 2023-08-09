import Header from '../components/messages/header/Header';
import { Suspense } from 'react';
import Body from '../components/messages/Body';
import MessageForm from '../components/messages/MessageForm';
import { Await, useLoaderData } from 'react-router-dom';
import { PbChat, PbMessage } from '../types/types';
import MessagesSkeleton from '../components/skeletons/MessagesSkeleton';
import ChatHeaderSkeleton from '../components/skeletons/ChatHeaderSkeleton';

const ChatMessagesPage = () => {
  const { chat, messages } = useLoaderData() as {
    chat: Promise<PbChat | null>;
    messages: Promise<PbMessage[] | never[]>;
  };

  return (
    <div className="h-full bg-chat-gradient bg-cover flex flex-col flex-1 relative">
      <Suspense fallback={<ChatHeaderSkeleton />}>
        <Await resolve={chat}>
          {(resolvedChat: PbChat) => <Header chat={resolvedChat} />}
        </Await>
      </Suspense>

      <Suspense fallback={<MessagesSkeleton />}>
        <Await resolve={messages}>
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
