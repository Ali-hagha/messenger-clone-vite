import { HiTrash } from 'react-icons/hi2';
import { HiDotsVertical } from 'react-icons/hi';

import IconBtn from '../IconBtn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface Props {
  handleOpenConfirmDeleteChatDialog: () => void;
}

const HeaderDropDownMenu = ({ handleOpenConfirmDeleteChatDialog }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <IconBtn icon={HiDotsVertical} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 text-gray-700">
        <DropdownMenuItem onClick={handleOpenConfirmDeleteChatDialog}>
          <HiTrash className="mr-2 h-4 w-4" />
          Delete Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropDownMenu;
