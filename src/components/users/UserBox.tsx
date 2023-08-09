import { MouseEvent, useState } from 'react';
import { PbUser } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { pocketbase } from '../../lib/pocketbase';

interface Props {
  user: PbUser;
}

const UserBox = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const currentUser = pocketbase.authStore.model;

  const handleClick = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const existingChats = await pocketbase.collection('chats').getFullList({
      sort: '-created',
      filter: `users ~ "${currentUser?.id}" && users ~ "${user.id}"`,
    });

    const singleChat = existingChats[0];

    if (singleChat && singleChat.id) {
      navigate(`../chats/${singleChat.id}`);
    }

    const data = {
      lastMessageAt: new Date(),
      isGroup: false,
      users: [currentUser?.id, user.id],
    };

    const newChat = await pocketbase.collection('chats').create(data);

    navigate(`../chats/${newChat.id}`);
  };

  return (
    <>
      <div
        onClick={e => handleClick(e)}
        className="mb-2 bg-white md:bg-transparent hover:bg-slate-200 text-gray-500 hover:text-gray-700 transition active:bg-slate-300 flex items-center justify-start p-3 rounded-xl cursor-pointer"
      >
        <Avatar user={user} />
        <div className="ml-4 select-none text-sm font-semibold">
          {user.name}
        </div>
      </div>
    </>
  );
};

export default UserBox;
