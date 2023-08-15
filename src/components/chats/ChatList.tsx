import clsx from "clsx";
import ChatListItems from "./ChatListItems";
import { PbChat } from "../../types/types";
import useChatInfo from "../../hooks/useChatInfo";

interface Props {
  chats: PbChat[];
}

const ChatList = ({ chats }: Props) => {
  const { isChatOpen } = useChatInfo();

  return (
    <aside
      className={clsx(
        "flex h-full w-full shrink-0 flex-col border-l-2 border-solid border-gray-100 bg-slate-100 px-3 py-6 md:w-80 md:bg-slate-50",
        isChatOpen && "hidden md:block",
      )}
    >
      <h3 className="mb-6 px-4 text-3xl font-semibold text-gray-700">
        Messages
      </h3>

      <div className="flex-1 space-y-2 overflow-auto pb-20 md:pb-0">
        <ChatListItems initialChats={chats} />
      </div>
    </aside>
  );
};

export default ChatList;
