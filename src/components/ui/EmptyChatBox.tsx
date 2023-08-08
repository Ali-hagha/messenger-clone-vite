interface Props {
  label?: string;
}

const EmptyChatBox = ({ label }: Props) => {
  return (
    <div className="h-full hidden md:flex items-center justify-center bg-chat-gradient bg-cover flex-1">
      <div className="py-2 px-4 lg:py-3 lg:px-6  shadow-white rounded-full bg-white">
        <h3 className="text-gray-500 font-semibold lg:text-lg select-none">
          {label || 'Select a chat or start a new conversation'}
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatBox;
