import { Link } from 'react-router-dom';

const ChatListEmptyState = () => {
  return (
    <div className="px-4 text-gray-500 text-center mt-6">
      <h4 className="text-lg font-semibold">
        You don&apos;t have any messages.
      </h4>
      <p className="mb-4">Select a user to start a new chat.</p>
      <Link
        to={'/users'}
        className="rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 w-full px-4 py-2 block font-semibold  
        transition "
      >
        Get back to users
      </Link>
    </div>
  );
};

export default ChatListEmptyState;
