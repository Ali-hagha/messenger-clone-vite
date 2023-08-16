import useChatInfo from "../../../hooks/useChatInfo";
import useNavRoutes from "../../../hooks/useNavRoutes";
import BottomNavItem from "./BottomNavItem";
import clsx from "clsx";

const MobileBottomNav = () => {
  const routes = useNavRoutes();
  const { isChatOpen } = useChatInfo();

  return (
    <div
      className={clsx(
        `fixed inset-x-4 bottom-4 z-50 mx-auto h-16 max-w-xs rounded-2xl bg-white p-2 shadow-2xl lg:hidden`,
        isChatOpen && "hidden",
      )}
    >
      <nav className="">
        <ul className="flex flex-row items-center justify-between space-x-4">
          {routes.map((route) => (
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
