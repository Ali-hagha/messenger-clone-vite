import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { PbChat, PbMessage } from '../../types/types';
import useOtherUser from '../../hooks/useOtherUser';
import { pocketbase } from '../../lib/pocketbase';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import ChatBoxSkeleton from '../skeletons/ChatBoxSkeleton';

interface Props {
  chat: PbChat;
  active: boolean;
}

const ChatBox = ({ chat, active }: Props) => {
  const otherUser = useOtherUser(chat);
  const [lastMessage, setLastMessage] = useState<PbMessage>();
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = pocketbase.authStore.model?.id;

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    const getLastMessage = async () => {
      setIsLoading(true);

      pocketbase
        .collection('messages')
        .getFirstListItem(`chat = "${chat.id}"`, {
          sort: '-created',
        })
        .then(res => {
          const message = res as unknown as PbMessage;
          setLastMessage(message);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (!lastMessage) {
      getLastMessage();
    }
  }, [chat.id, lastMessage]);

  const hasCurrentUserSeenLastMessage = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seenBy || [];

    if (!currentUserId) {
      return false;
    }

    return seenArray.some(userId => userId === currentUserId);
  }, [currentUserId, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return 'New chat';
  }, [lastMessage]);

  if (isLoading) {
    return <ChatBoxSkeleton />;
  }

  return (
    <Link
      to={`/chats/${chat.id}`}
      className={clsx(
        `hover:bg-slate-200 text-gray-500 hover:text-gray-700 active:bg-slate-300 transition flex items-center justify-start p-3 rounded-xl cursor-pointer`,
        active ? 'bg-slate-200 text-sky-600' : 'bg-white md:bg-transparent'
      )}
    >
      <Avatar user={otherUser} />
      <div className="flex select-none w-full justify-between">
        <div className="ml-4">
          <p className=" text-sm font-semibold mb-1">{otherUser.name}</p>
          <p className="text-xs truncate w-40 ">{lastMessageText}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          {!isLoading && lastMessage && (
            <p className="text-xs self-start text-gray-400 leading-5">
              {format(new Date(lastMessage.created), 'p')}
            </p>
          )}
          {!isLoading && !hasCurrentUserSeenLastMessage && (
            <span className="h-4 w-4 bg-sky-500 shrink-0 rounded-full mt-auto"></span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatBox;
