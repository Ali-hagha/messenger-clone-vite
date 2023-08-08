import { PbUser } from '../../types/types';
import UserBox from './UserBox';

interface Props {
  users: PbUser[];
}

const UserList = ({ users }: Props) => {
  return (
    <aside className="h-full w-full flex flex-col md:w-80 shrink-0 bg-slate-100 md:bg-slate-50 border-solid border-l-2 border-gray-100 py-6 px-3">
      <h3 className="text-gray-700 font-semibold text-3xl mb-6 px-4">
        Contacts
      </h3>
      <div className="overflow-auto flex-1 pb-20 md:pb-0">
        {users.map(user => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
