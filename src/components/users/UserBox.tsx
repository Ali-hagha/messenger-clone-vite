import { MouseEvent, useState } from "react";
import { PbUser } from "../../types/types";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { pocketbase } from "../../lib/pocketbase";

interface Props {
  user: PbUser;
}

const UserBox = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const currentUser = pocketbase.authStore.model;

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const existingChats = await pocketbase.collection("chats").getFullList({
      sort: "-created",
      filter: `users ~ "${currentUser?.id}" && users ~ "${user.id}"`,
    });

    const singleChat = existingChats[0];

    if (singleChat && singleChat.id) {
      setIsLoading(false);
      navigate(`../chats/${singleChat.id}`);
      return;
    }

    const data = {
      lastMessageAt: new Date(),
      isGroup: false,
      users: [currentUser?.id, user.id],
    };

    const newChat = await pocketbase.collection("chats").create(data);

    setIsLoading(false);
    navigate(`../chats/${newChat.id}`);
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={(e) => handleClick(e)}
      className="mb-2 flex w-full cursor-pointer items-center justify-start rounded-xl bg-white p-3 text-gray-500 transition enabled:hover:bg-slate-200 enabled:hover:text-gray-700 enabled:active:bg-slate-300 disabled:opacity-30 md:bg-transparent"
    >
      <Avatar user={user} />
      <div className="ml-4 select-none text-sm font-semibold">{user.name}</div>
    </button>
  );
};

export default UserBox;
