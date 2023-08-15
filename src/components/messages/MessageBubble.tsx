import clsx from "clsx";
import { format } from "date-fns";
import { PbMessage } from "../../types/types";
import { pocketbase } from "../../lib/pocketbase";
import { useInView } from "react-intersection-observer";
import { BsCheck2All } from "react-icons/bs";
import ChatBubbleAvatar from "../ui/ChatBubbleAvatar";

interface Props {
  message: PbMessage;
  isLastMessage: boolean;
}

const MessageBubble = ({ message, isLastMessage }: Props) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && user.id && !message.seenBy.includes(user.id)) {
        pocketbase
          .collection("messages")
          .update(message.id, { seenBy: [...message.seenBy, user.id] });
      }
    },
  });

  const user = pocketbase.authStore.model!;

  const isOwnMessage = message.expand.sender.email === user.email;

  const messageSeenCount = (message.expand.seenBy || []).filter(
    (user) => user.email !== message.expand.sender.email,
  ).length;

  const isMessageSeen = messageSeenCount > 0;

  return (
    <div
      ref={ref}
      className={clsx(
        `flex flex-col justify-center p-2`,
        isOwnMessage ? "items-end lg:items-start" : "items-start",
      )}
    >
      <div
        className={clsx(
          "flex",
          isOwnMessage ? "flex-row-reverse lg:flex-row" : "flex-row",
        )}
      >
        <div className="mx-3">
          <ChatBubbleAvatar user={message.expand.sender} />
        </div>
        <div className="flex flex-col">
          <div
            className={clsx(
              `flex flex-col break-words rounded-2xl px-4 py-2`,
              isOwnMessage
                ? "max-w-xs self-end rounded-se-sm bg-gradient-to-r from-sky-700 to-sky-500 text-white selection:bg-white/30 md:max-w-sm lg:self-start lg:rounded-se-2xl lg:rounded-ss-sm"
                : "max-w-xs rounded-ss-sm bg-white text-gray-600 selection:bg-sky-200 md:max-w-sm ",
            )}
          >
            <p className="text-sm sm:text-base">{message.body}</p>
            <div className="mt-3 flex flex-row self-start lg:flex-row-reverse lg:self-end">
              <p className="select-none text-xs">
                {format(new Date(message.created), "p")}
              </p>
            </div>
          </div>
          {isMessageSeen &&
            isOwnMessage &&
            isLastMessage &&
            messageSeenCount === 1 && (
              <div className="self-start pt-1 text-xl font-semibold text-gray-500 lg:self-end">
                <BsCheck2All />
              </div>
            )}
          {isMessageSeen &&
            isOwnMessage &&
            isLastMessage &&
            messageSeenCount > 1 && (
              <div className="pt-1 text-xs font-semibold text-gray-500">
                <p>seen by {messageSeenCount} people</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
