'use client';

import useChatInfo from '../../../hooks/useChatInfo';
import useNavRoutes from '../../../hooks/useNavRoutes';
import BottomNavItem from './BottomNavItem';
import clsx from 'clsx';

const MobileBottomNav = () => {
  const routes = useNavRoutes();
  const { isChatOpen } = useChatInfo();

  return (
    <div
      className={clsx(
        `lg:hidden fixed bottom-4 inset-x-4 h-16 rounded-2xl shadow-2xl p-2 bg-white max-w-xs mx-auto z-50`,
        isChatOpen && 'hidden'
      )}
    >
      <nav className="">
        <ul className="flex flex-row items-center justify-between space-x-4">
          {routes.map(route => (
            <BottomNavItem
              key={route.title}
              href={route.href}
              active={route.active}
              icon={route.icon}
              title={route.title}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileBottomNav;
