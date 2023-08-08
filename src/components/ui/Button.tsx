import clsx from 'clsx';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  danger?: boolean;
  small?: boolean;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  secondary,
  danger,
  small,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex justify-center items-center rounded-xl px-4 py-2 font-semibold  
        transition focus-visible:outline-none focus-visible:border-none
        disabled:opacity-40`,
        fullWidth && 'w-full',
        danger &&
          'bg-rose-500 text-white enabled:hover:bg-rose-600 enabled:active:bg-rose-700',
        secondary &&
          'text-gray-600 bg-transparent enabled:hover:bg-gray-100 enabled:active:bg-gray-200',
        !danger &&
          !secondary &&
          'text-white bg-sky-500 enabled:hover:bg-sky-600 enabled:active:bg-sky-700',
        small && 'rounded-lg text-sm'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
