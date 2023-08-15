import { BsCheck2All } from "react-icons/bs";
import { PbMessage } from "../../types/types";

interface Props {
  message: PbMessage;
  isOwnMessage: boolean;
  isLastMessage: boolean;
}

const MessageSeenIndicator = ({
  message,
  isOwnMessage,
  isLastMessage,
}: Props) => {
  const messageSeenCount = (message.expand.seenBy || []).filter(
    (user) => user.email !== message.expand.sender.email,
  ).length;

  const isMessageSeen = messageSeenCount > 0;
  return (
    <>
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
    </>
  );
};

export default MessageSeenIndicator;
