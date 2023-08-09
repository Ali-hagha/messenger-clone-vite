import { HiChevronLeft } from 'react-icons/hi';
import HeaderDropDownMenu from './HeaderDropDownMenu';
import { useState } from 'react';
import ConfirmDeleteChatDialog from './ConfirmDeleteChatDialog';
import { PbChat } from '../../../types/types';
import useOtherUser from '../../../hooks/useOtherUser';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/Avatar';

interface Props {
  chat: PbChat;
}

const Header = ({ chat }: Props) => {
  const otherUser = useOtherUser(chat);
  const [isConfirmDeleteChatDialogOpen, setisConfirmDeleteChatDialogOpen] =
    useState(false);

  const openConfirmDeleteChatDialog = () => {
    setisConfirmDeleteChatDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 py-3 bg-white/60 backdrop-blur-lg absolute top-0 inset-x-0 w-full h-16 z-50">
        <div className="flex items-center">
          <Link
            to="/conversations"
            className="block lg:hidden p-1 text-gray-500 text-3xl rounded-xl transition active:bg-sky-200 active:text-sky-700"
          >
            <HiChevronLeft />
          </Link>
          <div className="flex items-center ml-4">
            <Avatar user={otherUser} />
            <div className="ml-3 select-none text-gray-700">
              <p className="text-sm font-semibold mb-1">
                {chat.name || otherUser.name}
              </p>
              <p className="text-xs">Online</p>
            </div>
          </div>
        </div>
        <HeaderDropDownMenu
          handleOpenConfirmDeleteChatDialog={openConfirmDeleteChatDialog}
        />
        <ConfirmDeleteChatDialog
          isOpen={isConfirmDeleteChatDialogOpen}
          setIsOpen={setisConfirmDeleteChatDialogOpen}
        />
      </div>
    </>
  );
};

export default Header;
