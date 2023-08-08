import { useState } from 'react';
import ChatBox from './ChatBox';
import { PbChat } from '../../types/types';
import useChatInfo from '../../hooks/useChatInfo';

interface Props {
  initialChats: PbChat[];
}

const ChatListItems = ({ initialChats }: Props) => {
  const { chatId } = useChatInfo();
  const [chats] = useState<PbChat[]>(initialChats);

  return chats.map(chat => {
    return <ChatBox key={chat.id} active={chatId === chat.id} chat={chat} />;
  });
};

export default ChatListItems;
