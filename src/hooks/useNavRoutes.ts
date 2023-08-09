import { useMemo } from 'react';
import { RiChat1Fill, RiLogoutCircleLine, RiTeamFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import useChatInfo from './useChatInfo';
import { pocketbase } from '../lib/pocketbase';

const useNavRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { chatId } = useChatInfo();

  const routes = useMemo(
    () => [
      {
        href: '/users',
        active: pathname === '/users',
        icon: RiTeamFill,
        title: 'users',
      },
      {
        href: '/chats',
        active: pathname === '/chats' || chatId.length > 0,
        icon: RiChat1Fill,
        title: 'chats',
      },
      {
        href: '/#',
        icon: RiLogoutCircleLine,
        title: 'log out',
        onClick: () => handleLogout(),
      },
    ],
    [chatId, pathname]
  );

  return routes;
};

const handleLogout = () => {
  pocketbase.authStore.clear();
  location.replace('/');
};

export default useNavRoutes;
