import { HiChevronLeft } from "react-icons/hi";
import HeaderDropDownMenu from "./HeaderDropDownMenu";
import { useState } from "react";
import ConfirmDeleteChatDialog from "./ConfirmDeleteChatDialog";
import { PbChat } from "../../../types/types";
import useOtherUser from "../../../hooks/useOtherUser";
import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";

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
      <div className="absolute inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-white/60 px-3 py-3 backdrop-blur-lg">
        <div className="flex items-center">
          <Link
            to="/chats"
            className="block rounded-xl p-1 text-3xl text-gray-500 transition active:bg-sky-200 active:text-sky-700 lg:hidden"
          >
            <HiChevronLeft />
          </Link>
          <div className="ml-4 flex items-center">
            <Avatar user={otherUser} />
            <div className="ml-3 select-none text-gray-700">
              <p className="mb-1 text-sm font-semibold">
                {chat.name || otherUser.name}
              </p>
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
