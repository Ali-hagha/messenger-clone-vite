import { HiPaperAirplane, HiPaperClip } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { useForm } from 'react-hook-form';
import IconBtn from './IconBtn';
import useChatInfo from '../../hooks/useChatInfo';
import { pocketbase } from '../../lib/pocketbase';

export type MessageInputType = {
  message: string;
};

const MessageForm = () => {
  const { chatId } = useChatInfo();
  const currentUser = pocketbase.authStore.model;

  const { register, handleSubmit, setValue } = useForm<MessageInputType>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    setValue('message', '', { shouldValidate: true });

    const newMessage = {
      body: data.message,
      seenBy: [currentUser?.id],
      chat: chatId,
      sender: currentUser?.id,
    };

    pocketbase.collection('messages').create(newMessage);
  });

  return (
    <div className="bg-white p-3 flex items-center justify-center">
      <IconBtn icon={HiPaperClip} />

      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center flex-1"
      >
        <MessageInput
          register={register}
          id="message"
          required
          placeholder="Write a message..."
        />
        <IconBtn type="submit" icon={HiPaperAirplane} />
      </form>
    </div>
  );
};

export default MessageForm;
