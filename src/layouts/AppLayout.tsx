import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import MobileBottomNav from "../components/ui/mobileBottomNav/MobileBottomNav";
import { pocketbase } from "../lib/pocketbase";
import { useEffect } from "react";
import setUserOnlineStatus from "../actions/setUserOnlineStatus";

const AppLayout = () => {
  const currentUser = pocketbase.authStore.model;
  const handleVisibilityChange = () => {
    if (currentUser && currentUser.id) {
      setUserOnlineStatus(
        document.visibilityState === "visible",
        currentUser.id,
      );
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange, true);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
        true,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <main className="h-full">
      <div className="relative flex h-full">
        <Sidebar />
        <MobileBottomNav />
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
