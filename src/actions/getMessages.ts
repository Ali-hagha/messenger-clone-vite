import { pocketbase } from "../lib/pocketbase";
import { PbMessage } from "../types/types";

const getMessages = async (chatId: string) => {
  try {
    const messages = pocketbase.collection("messages").getFullList({
      sort: "+created",
      filter: `chat = '${chatId}'`,
      expand: "sender,seenBy",
    });

    return messages as Promise<PbMessage[]>;
  } catch (_) {
    return [];
  }
};

export default getMessages;
