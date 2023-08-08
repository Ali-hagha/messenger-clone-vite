import { Skeleton } from '../ui/skeleton';

const MessagesSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 pt-24 overflow-y-auto px-6 space-y-3">
      <Skeleton className="w-60 md:w-72 h-24 rounded-xl bg-gray-100 p-3 space-y-2 flex flex-col">
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </Skeleton>
      <Skeleton className="w-60 md:w-72 h-24 rounded-xl bg-gray-100 p-3 space-y-2 flex flex-col self-end items-end">
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </Skeleton>
      <Skeleton className="w-60 md:w-72 h-24 rounded-xl bg-gray-100 p-3 space-y-2 flex flex-col">
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-52 md:w-64 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </Skeleton>
    </div>
  );
};

export default MessagesSkeleton;
