import useNavRoutes from '../../hooks/useNavRoutes';
import SidebarItem from './SidebarItem';

// import Avatar from '../Avatar';
// import Logo from '../Logo';
// import SidebarSkeleton from '../skeletons/SidebarSkeleton';

const Sidebar = () => {
  const routes = useNavRoutes();

  // if (!user) {
  //   return <SidebarSkeleton />;
  // }

  return (
    <div className="h-full w-20 hidden shrink-0 lg:flex flex-col items-center py-4">
      {/* <Logo /> */}
      <div className="pt-12">
        {/* <Avatar onClick={() => console.log('avatar')} user={user} /> */}
      </div>

      <nav className="pt-12">
        <ul className="space-y-3">
          {routes.map(route => (
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
