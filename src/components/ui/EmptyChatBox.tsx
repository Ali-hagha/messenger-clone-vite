import clsx from "clsx";
import useChatInfo from "../../hooks/useChatInfo";

interface Props {
  label?: string;
}

const EmptyChatBox = ({ label }: Props) => {
  const { chatId } = useChatInfo();

  return (
    <div
      className={clsx(
        `h-full flex-1 items-center justify-center bg-chat-gradient bg-cover`,
        chatId ? "flex" : "hidden md:flex",
      )}
    >
      <div className="rounded-full bg-white px-4 py-2  shadow-white lg:px-6 lg:py-3">
        <h3 className="select-none font-semibold text-gray-500 lg:text-lg">
          {label || "Select a chat or start a new conversation"}
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatBox;
