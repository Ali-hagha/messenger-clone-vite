import { Await, Outlet, useLoaderData } from "react-router-dom";
import ChatList from "../components/chats/ChatList";
import { PbChat } from "../types/types";
import { Suspense } from "react";
import ChatListSkeleton from "../components/skeletons/ChatListSkeleton";

const ChatsLayout = () => {
  const { chats } = useLoaderData() as { chats: Promise<PbChat[]> | never[] };

  return (
    <div className="flex w-full">
      <Suspense fallback={<ChatListSkeleton />}>
        <Await resolve={chats}>
          {(resolvedChats: PbChat[]) => <ChatList chats={resolvedChats} />}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
};

export default ChatsLayout;
