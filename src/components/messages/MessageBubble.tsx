import clsx from 'clsx';
import { format } from 'date-fns';
import { PbMessage } from '../../types/types';
import { pocketbase } from '../../lib/pocketbase';
import Avatar from '../ui/Avatar';

interface Props {
  message: PbMessage;
  isLastMessage: boolean;
}

const MessageBubble = ({ message, isLastMessage }: Props) => {
  const user = pocketbase.authStore.model!;

  const isOwnMessage = message.expand.sender.email === user.email;

  const messageSeenCount = (message.expand.seenBy || []).filter(
    user => user.email !== message.expand.sender.email
  ).length;

  const isMessageSeen = messageSeenCount > 0;

  const seenList = (message.expand.seenBy || [])
    .filter(user => user.email !== message.expand.sender.email)
    .map(user => user.name)
    .join(', ');

  return (
    <div
      className={clsx(
        `p-2 flex flex-col justify-center`,
        isOwnMessage ? 'items-end lg:items-start' : 'items-start'
      )}
    >
      <div
        className={clsx(
          'flex',
          isOwnMessage ? 'flex-row-reverse lg:flex-row' : 'flex-row'
        )}
      >
        <div className="mx-3">
          <Avatar user={message.expand.sender} />
        </div>
        <div className="flex flex-col">
          <div
            className={clsx(
              `py-2 px-4 rounded-2xl break-words flex flex-col`,
              isOwnMessage
                ? 'bg-gradient-to-r from-sky-700 to-sky-500 text-white max-w-xs md:max-w-sm rounded-se-sm lg:rounded-ss-sm lg:rounded-se-2xl selection:bg-white/30'
                : 'bg-white text-gray-600 rounded-ss-sm selection:bg-sky-200 max-w-xs md:max-w-sm '
            )}
          >
            <p className="text-sm sm:text-base">{message.body}</p>
            <div className="flex flex-row lg:flex-row-reverse mt-3 self-start lg:self-end">
              <p className="text-xs select-none">
                {format(new Date(message.created), 'p')}
              </p>
            </div>
          </div>
          {isMessageSeen &&
            isOwnMessage &&
            isLastMessage &&
            messageSeenCount === 1 && (
              <div className="pt-1 text-xs font-semibold text-gray-500">
                <p>seen by {seenList}</p>
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
