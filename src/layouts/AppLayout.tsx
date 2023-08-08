import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import MobileBottomNav from '../components/ui/mobileBottomNav/MobileBottomNav';
import { pocketbase } from '../lib/pocketbase';

const AppLayout = () => {
  const currentUser = pocketbase.authStore.model;

  if (!currentUser) {
    return <Navigate to={'/'} replace={true} />;
  }

  return (
    <main className="h-full">
      <div className="h-full flex relative">
        <Sidebar />
        <MobileBottomNav />
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
