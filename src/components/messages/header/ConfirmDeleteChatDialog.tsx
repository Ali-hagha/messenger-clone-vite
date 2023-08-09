import { Close, Dialog } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import Button from '../../ui/Button';
import { pocketbase } from '../../../lib/pocketbase';
import useChatInfo from '../../../hooks/useChatInfo';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ConfirmDeleteChatDialog = ({ isOpen, setIsOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChatInfo();
  const navigate = useNavigate();

  const handleDeleteChat = async () => {
    setIsLoading(true);
    await pocketbase.collection('chats').delete(chatId);

    setIsLoading(false);
    setIsOpen(false);

    navigate('../chats');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Are you sure absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this chat?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Close asChild>
            <Button type="submit" secondary small>
              Cancel
            </Button>
          </Close>
          <Button
            type="submit"
            danger
            small
            onClick={handleDeleteChat}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteChatDialog;
