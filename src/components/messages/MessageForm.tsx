import { HiPaperAirplane, HiPaperClip } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { useForm } from "react-hook-form";
import IconBtn from "./IconBtn";
import useChatInfo from "../../hooks/useChatInfo";
import { pocketbase } from "../../lib/pocketbase";
import { useEffect } from "react";

export type MessageInputType = {
  message: string;
};

const MessageForm = () => {
  const { chatId } = useChatInfo();
  const currentUser = pocketbase.authStore.model;

  const { register, handleSubmit, setValue } = useForm<MessageInputType>({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    setValue("message", "", { shouldValidate: true });
  }, [setValue, chatId]);

  const onSubmit = handleSubmit((data) => {
    setValue("message", "", { shouldValidate: true });

    const newMessage = {
      body: data.message,
      seenBy: [currentUser?.id],
      chat: chatId,
      sender: currentUser?.id,
    };

    pocketbase.collection("messages").create(newMessage);
  });

  return (
    <div className="flex items-center justify-center bg-white p-3">
      <IconBtn icon={HiPaperClip} />

      <form
        onSubmit={onSubmit}
        className="flex flex-1 items-center justify-center"
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
