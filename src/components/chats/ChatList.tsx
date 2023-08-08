import clsx from 'clsx';
import ChatListEmptyState from './ChatListEmptyState';
import ChatListItems from './ChatListItems';
import { PbChat } from '../../types/types';
import useChatInfo from '../../hooks/useChatInfo';

interface Props {
  chats: PbChat[];
}

const ChatList = ({ chats }: Props) => {
  const { isChatOpen } = useChatInfo();

  return (
    <aside
      className={clsx(
        'h-full w-full flex flex-col md:w-80 shrink-0 bg-slate-100 md:bg-slate-50 border-solid border-l-2 border-gray-100 py-6 px-3',
        isChatOpen && 'hidden md:block'
      )}
    >
      <h3 className="text-gray-700 font-semibold text-3xl mb-6 px-4">
        Messages
      </h3>

      {chats.length === 0 && <ChatListEmptyState />}

      <div className="space-y-2 overflow-auto flex-1 pb-20 md:pb-0">
        <ChatListItems initialChats={chats} />
      </div>
    </aside>
  );
};

export default ChatList;
