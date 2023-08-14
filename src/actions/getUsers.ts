import { defer } from "react-router-dom";
import { pocketbase } from "../lib/pocketbase";
import { PbUser } from "../types/types";

const getUsers = async () => {
  const currentUser = pocketbase.authStore.model;

  if (!currentUser?.email) {
    return [];
  }

  try {
    const users = pocketbase.collection("users").getFullList({
      sort: "-created",
      filter: `id != '${currentUser.id}'`,
    });

    return defer({
      users: users as Promise<PbUser[]>,
    });
  } catch (_) {
    return [];
  }
};

export default getUsers;
