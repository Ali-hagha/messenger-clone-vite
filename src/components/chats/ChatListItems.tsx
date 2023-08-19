import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { PbChat } from "../../types/types";
import useChatInfo from "../../hooks/useChatInfo";
import { pocketbase } from "../../lib/pocketbase";
import getChatById from "../../actions/getChatById";
import { useNavigate } from "react-router-dom";
import ChatListEmptyState from "./ChatListEmptyState";
import { UnsubscribeFunc } from "pocketbase";

interface Props {
  initialChats: PbChat[];
}

const ChatListItems = ({ initialChats }: Props) => {
  const { chatId } = useChatInfo();
  const navigate = useNavigate();
  const [chats, setChats] = useState<PbChat[]>(initialChats);

  useEffect(() => {
    let unsubscribe: UnsubscribeFunc = () => {
      return new Promise(() => {});
    };

    const subscribe = async () => {
      unsubscribe = await pocketbase
        .collection("chats")
        .subscribe("*", async (action) => {
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

          if (action.action === "update") {
            const updatedChat = await getChatById(action.record.id);

            const compareChatUpdatedDate = (chatA: PbChat, chatB: PbChat) => {
              const timeOfA = new Date(chatA.updated).getTime();
              const timeOfB = new Date(chatB.updated).getTime();
              return timeOfB - timeOfA;
            };

            if (updatedChat) {
              setChats((oldChats) => {
                return oldChats
                  .map((chat) =>
                    chat.id !== updatedChat.id ? chat : updatedChat,
                  )
                  .sort(compareChatUpdatedDate);
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
    };

    subscribe();

    return () => {
      unsubscribe();
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
