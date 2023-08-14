import { pocketbase } from "../lib/pocketbase";
import { PbMessage } from "../types/types";

const getMessageById = async (messageId: string) => {
  try {
    const message = await pocketbase.collection("messages").getOne(messageId, {
      expand: "seenBy,sender",
    });

    return message as PbMessage;
  } catch (_) {
    return null;
  }
};

export default getMessageById;
