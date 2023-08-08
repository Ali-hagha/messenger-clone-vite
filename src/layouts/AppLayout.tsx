import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

const AppLayout = () => {
  return (
    <main className="h-full">
      <div className="h-full flex relative">
        <Sidebar />
        {/* <MobileBottomNav /> */}
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
