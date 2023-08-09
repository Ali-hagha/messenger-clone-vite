import { Skeleton } from '../ui/skeleton';
import AvatarSkeleton from './AvatarSkeleton';

const ChatHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-3 py-3 bg-white/60 backdrop-blur-lg absolute top-0 inset-x-0 w-full h-16 z-50">
      <div className="flex items-center">
        <div className="flex items-center ml-4">
          <AvatarSkeleton />
          <div className="ml-3 select-none text-gray-700">
            <Skeleton className=" mb-2 h-4 w-24 rounded-full bg-gray-200" />
            <Skeleton className="h-3 w-10 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeaderSkeleton;
