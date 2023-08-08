import { Skeleton } from '../ui/skeleton';

const ConversationsListSkeleton = () => {
  return (
    <aside className="h-full w-full flex flex-col md:w-80 shrink-0 bg-slate-100 md:bg-slate-50 border-solid border-l-2 border-gray-100 py-6 px-3">
      <h3 className="text-gray-700 font-semibold text-3xl mb-6 px-4">
        Messages
      </h3>
      <div className="overflow-auto flex-1 pb-20 md:pb-0">
        {Array.from({ length: 5 }, (_, index) => index).map(item => (
          <Skeleton
            key={item}
            className="mb-2 bg-gray-100 flex items-center justify-start p-3 rounded-xl "
          >
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200" />
            <Skeleton className="ml-4 rounded-full bg-gray-200 w-28 h-5" />
          </Skeleton>
        ))}
      </div>
    </aside>
  );
};

export default ConversationsListSkeleton;
