import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { PbChat } from "../../types/types";
import useChatInfo from "../../hooks/useChatInfo";
import { createPocketbase } from "../../lib/pocketbase";
import getChatById from "../../actions/getChatById";
import { useNavigate } from "react-router-dom";
import ChatListEmptyState from "./ChatListEmptyState";

interface Props {
  initialChats: PbChat[];
}

const ChatListItems = ({ initialChats }: Props) => {
  const { chatId } = useChatInfo();
  const navigate = useNavigate();
  const [chats, setChats] = useState<PbChat[]>(initialChats);

  useEffect(() => {
    const pb = createPocketbase();
    pb.collection("chats").subscribe("*", async (action) => {
      if (action.action === "create") {
        const newChat = await getChatById(action.record.id);

        if (newChat) {
          setChats((oldChats) => {
            if (!oldChats) {
              return [newChat];
            }

            if (oldChats.some((c) => c.id === newChat.id)) {
              return oldChats;
            }

            return [newChat, ...oldChats];
          });
        }
      }

      if (action.action === "delete") {
        setChats((oldChats) => {
          return oldChats.filter((chat) => chat.id !== action.record.id);
        });

        navigate("../chats");
      }
    });

    return () => {
      pb.collection("chats").unsubscribe("*");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chats.length === 0) {
    return <ChatListEmptyState />;
  }

  return chats.map((chat) => {
    return <ChatBox key={chat.id} active={chatId === chat.id} chat={chat} />;
  });
};

export default ChatListItems;
