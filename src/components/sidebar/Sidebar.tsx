import useNavRoutes from "../../hooks/useNavRoutes";
import { pocketbase } from "../../lib/pocketbase";
import { PbUser } from "../../types/types";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import Avatar from "../ui/Avatar";
import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const routes = useNavRoutes();
  const currentUser = pocketbase.authStore.model as unknown as PbUser;

  if (!currentUser) {
    return <SidebarSkeleton />;
  }

  return (
    <div className="hidden h-full w-20 shrink-0 flex-col items-center py-4 lg:flex">
      <Logo />
      <div className="pt-12">
        <Avatar onClick={() => console.log("avatar")} user={currentUser} />
      </div>

      <nav className="pt-12">
        <ul className="space-y-3">
          {routes.map((route) => (
            <SidebarItem
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

export default Sidebar;
