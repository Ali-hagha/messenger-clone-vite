import clsx from 'clsx';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface Props {
  href: string;
  title: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}

const BottomNavItem = ({ href, title, active, icon: Icon, onClick }: Props) => {
  return (
    <li className="flex-1">
      <Link
        onClick={onClick}
        to={href}
        className={clsx(
          `rounded-xl overflow-hidden flex items-center justify-center text-2xl text-gray-500 p-3 transition hover:bg-sky-100 hover:text-sky-600 active:bg-sky-200 active:text-sky-700`,
          active && 'text-sky-600 bg-sky-100'
        )}
      >
        <span className="sr-only">{title}</span>
        <Icon />
      </Link>
    </li>
  );
};

export default BottomNavItem;
