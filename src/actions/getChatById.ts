import { pocketbase } from "../lib/pocketbase";
import { PbChat } from "../types/types";

const getChatById = async (chatId: string) => {
  try {
    const currentUser = pocketbase.authStore.model;

    if (!currentUser) {
      return null;
    }

    const chat = pocketbase.collection("chats").getOne(chatId, {
      expand: "users",
      $autoCancel: false,
    });

    return chat as Promise<PbChat>;
  } catch (_) {
    return null;
  }
};

export default getChatById;
