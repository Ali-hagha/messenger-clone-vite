import { Skeleton } from '../ui/skeleton';

const ChatBoxSkeleton = () => {
  return (
    <Skeleton className="mb-2 bg-gray-100 flex items-center justify-start p-3 rounded-xl ">
      <Skeleton className="w-10 h-10 rounded-full bg-gray-200" />
      <div>
        <Skeleton className="ml-4 rounded-full bg-gray-200 w-28 h-4 mb-1" />
        <Skeleton className="ml-4 rounded-full bg-gray-200 w-20 h-3" />
      </div>
    </Skeleton>
  );
};

export default ChatBoxSkeleton;
