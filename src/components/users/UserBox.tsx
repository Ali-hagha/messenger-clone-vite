'use client';

import axios from 'axios';
import { MouseEvent, useCallback, useState } from 'react';
import { PbUser } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';

interface Props {
  user: PbUser;
}

const UserBox = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      setIsLoading(true);

      axios
        .post('/api/conversations', { userId: user.id })
        .then(data => {
          navigate(`/conversations/${data.data.id}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [navigate, user.id]
  );

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
