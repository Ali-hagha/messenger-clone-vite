import Logo from '../ui/Logo';
import { Skeleton } from '../ui/skeleton';
import AvatarSkeleton from './AvatarSkeleton';

const SidebarSkeleton = () => {
  return (
    <div className="h-full w-20 hidden shrink-0 lg:flex flex-col items-center py-4">
      <Logo />
      <div className="pt-12">
        <AvatarSkeleton />
      </div>

      <nav className="pt-12">
        <ul className="space-y-3">
          {Array.from({ length: 5 }, (_, index) => index).map(item => (
            <Skeleton key={item} className="w-12 h-12 bg-gray-200 rounded-xl" />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarSkeleton;
