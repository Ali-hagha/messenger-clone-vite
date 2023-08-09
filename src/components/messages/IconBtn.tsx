import { IconType } from 'react-icons';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon: IconType;
  onClick?: () => void;
}

const IconBtn = ({ type, className, icon: Icon }: Props) => {
  return (
    <button
      type={type}
      className={`p-2 text-gray-500 text-2xl rounded-xl transition hover:bg-sky-100 hover:text-sky-600 active:bg-sky-200 active:text-sky-700 ${className}`}
    >
      <Icon />
    </button>
  );
};

export default IconBtn;
