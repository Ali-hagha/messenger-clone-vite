import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { PbChat, PbMessage } from "../../types/types";
import useOtherUser from "../../hooks/useOtherUser";
import { createPocketbase, pocketbase } from "../../lib/pocketbase";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import ChatBoxSkeleton from "../skeletons/ChatBoxSkeleton";
import getLastMessagByChatId from "../../actions/getLastMessageByChatId";
import useChatInfo from "../../hooks/useChatInfo";

interface Props {
  chat: PbChat;
  active: boolean;
}

const ChatBox = ({ chat, active }: Props) => {
  const otherUser = useOtherUser(chat);
  const { chatId: activeChatId } = useChatInfo();
  const [lastMessage, setLastMessage] = useState<PbMessage>();
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = pocketbase.authStore.model?.id;

  useEffect(() => {
    const pb = createPocketbase();
    pb.collection("messages").subscribe("*", async (action) => {
      const newMessage = action.record as PbMessage;
      if (newMessage.chat === chat.id) {
        setLastMessage(newMessage);
      }
    });

    return () => {
      pb.collection("messages").unsubscribe("*");
    };
  }, [chat.id]);

  useEffect(() => {
    const getLastMessage = async () => {
      setIsLoading(true);
      const message = await getLastMessagByChatId(chat.id);

      if (message) {
        setLastMessage(message);
      }

      setIsLoading(false);
    };

    if (!lastMessage) {
      getLastMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.id]);

  const hasCurrentUserSeenLastMessage = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seenBy || [];

    if (!currentUserId) {
      return false;
    }

    return seenArray.some((userId) => userId === currentUserId);
  }, [currentUserId, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "New chat";
  }, [lastMessage]);

  if (isLoading) {
    return <ChatBoxSkeleton />;
  }

  return (
    <Link
      to={`/chats/${chat.id}`}
      className={clsx(
        `flex cursor-pointer items-center justify-start rounded-xl p-3 text-gray-500 transition hover:bg-slate-200 hover:text-gray-700 active:bg-slate-300`,
        active ? "bg-slate-200 text-sky-600" : "bg-white md:bg-transparent",
      )}
    >
      <Avatar user={otherUser} />
      <div className="flex w-full select-none justify-between">
        <div className="ml-4">
          <p className=" mb-1 text-sm font-semibold">{otherUser.name}</p>
          <p className="w-40 truncate text-xs ">{lastMessageText}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          {!isLoading && lastMessage && (
            <p className="self-start text-xs leading-5 text-gray-400">
              {format(new Date(lastMessage.created), "p")}
            </p>
          )}
          {!isLoading &&
            !hasCurrentUserSeenLastMessage &&
            activeChatId !== chat.id && (
              <span className="mt-auto h-4 w-4 shrink-0 rounded-full bg-sky-500"></span>
            )}
        </div>
      </div>
    </Link>
  );
};

export default ChatBox;
