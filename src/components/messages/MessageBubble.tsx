import clsx from "clsx";
import { format } from "date-fns";
import { PbMessage } from "../../types/types";
import { pocketbase } from "../../lib/pocketbase";
import { useInView } from "react-intersection-observer";
import ChatBubbleAvatar from "../ui/ChatBubbleAvatar";
import MessageSeenIndicator from "./MessageSeenIndicator";

interface Props {
  message: PbMessage;
  isLastMessage: boolean;
  previousMessage: PbMessage | undefined;
}

const MessageBubble = ({ message, isLastMessage, previousMessage }: Props) => {
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

  const isFirstMessageByUser = previousMessage
    ? message.sender !== previousMessage.sender
    : true;

  return (
    <div
      ref={ref}
      className={clsx(
        `flex flex-col justify-center`,
        isOwnMessage ? "items-end lg:items-start" : "items-start",
        isFirstMessageByUser ? "pb-0.5 pt-3" : "p-0.5",
      )}
    >
      <div
        className={clsx(
          "flex",
          isOwnMessage ? "flex-row-reverse lg:flex-row" : "flex-row",
        )}
      >
        <div className={clsx(`mx-3`, isFirstMessageByUser || "p-5")}>
          {isFirstMessageByUser && (
            <ChatBubbleAvatar user={message.expand.sender} />
          )}
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
          <MessageSeenIndicator
            message={message}
            isLastMessage={isLastMessage}
            isOwnMessage={isOwnMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
