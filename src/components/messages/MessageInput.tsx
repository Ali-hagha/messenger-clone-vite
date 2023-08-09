import { UseFormRegister } from 'react-hook-form';
import { MessageInputType } from './MessageForm';

interface Props {
  placeholder?: string;
  type?: string;
  id: 'message';
  required?: boolean;
  register: UseFormRegister<MessageInputType>;
}

const MessageInput = ({ placeholder, type, id, required, register }: Props) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        autoComplete={'off'}
        className="flex-1 mx-3 w-full rounded-xl py-2 px-4 text-gray-700 focus:outline-none tracking-wide bg-slate-100"
        {...register(id, { required })}
      />
    </div>
  );
};

export default MessageInput;
