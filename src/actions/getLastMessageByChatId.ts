import { pocketbase } from "../lib/pocketbase";
import { PbMessage } from "../types/types";

const getLastMessagByChatId = async (chatId: string) => {
  try {
    const lastMessage = await pocketbase
      .collection("messages")
      .getFirstListItem(`chat = "${chatId}"`, {
        sort: "-created",
      });

    return lastMessage as PbMessage;
  } catch (error) {
    return null;
  }
};

export default getLastMessagByChatId;
