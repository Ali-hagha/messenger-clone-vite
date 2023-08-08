'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { PbUser } from '../../types/types';

interface Props {
  user: PbUser;
  onClick?: () => void;
}

const Avatar = ({ onClick, user }: Props) => {
  const [isActive] = useState(true);

  return (
    <div className="relative flex items-center">
      <button
        className={clsx(
          `rounded-full overflow-hidden transition w-10 h-10 bg-sky-100`,
          onClick
            ? 'cursor-pointer ring-2 ring-offset-2 ring-gray-200 hover:ring-4 hover:ring-gray-300 active:ring-offset-4 active:ring-gray-400'
            : 'cursor-default'
        )}
      >
        <img
          className="w-10 h-10"
          src={
            user?.avatarUrl ||
            `https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.email}`
          }
          alt="avatar"
          height={40}
          width={40}
        />
      </button>

      {isActive && (
        <div
          className={clsx(
            `absolute bottom-0.5 right-0.5 w-2 h-2 ring-1 ring-white ring-offset-1 rounded-full bg-green-400`
          )}
        ></div>
      )}
    </div>
  );
};

export default Avatar;
