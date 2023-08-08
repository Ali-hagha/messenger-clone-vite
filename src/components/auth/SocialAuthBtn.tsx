import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  title: string;
  onClick: () => void;
  disabled: boolean;
}
const SocialAuthBtn = ({ icon: Icon, title, onClick, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className="flex-1 w-full md:w-auto px-3 sm:px-6 py-3 flex items-center justify-center rounded-xl border-2 border-solid border-gray-300 enabled:hover:border-gray-500 focus-visible:border-gray-500 enabled:active:border-gray-500 enabled:active:bg-gray-100 transition disabled:opacity-30 "
    >
      <div className="text-gray-700 flex items-center justify-center text-lg">
        <Icon className="shrink-0" />

        <span className="text-sm pl-3">{title}</span>
      </div>
    </button>
  );
};

export default SocialAuthBtn;
