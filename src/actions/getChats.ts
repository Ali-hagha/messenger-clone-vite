import { defer } from "react-router-dom";
import { pocketbase } from "../lib/pocketbase";
import { PbChat } from "../types/types";

const getChats = async () => {
  const currentUser = pocketbase.authStore.model;

  if (!currentUser?.email) {
    return [];
  }

  try {
    const chats = pocketbase.collection("chats").getFullList({
      sort: "-created",
      expand: "users",
      filter: `users ~ '${currentUser.id}'`,
    });
    return defer({
      chats: chats as Promise<PbChat[]>,
    });
  } catch (_) {
    return [];
  }
};

export default getChats;
