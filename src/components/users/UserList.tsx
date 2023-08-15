import { PbUser } from "../../types/types";
import UserListItems from "./UserListItems";

interface Props {
  users: PbUser[];
}

const UserList = ({ users }: Props) => {
  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-l-2 border-solid border-gray-100 bg-slate-100 px-3 py-6 md:w-80 md:bg-slate-50">
      <h3 className="mb-6 px-4 text-3xl font-semibold text-gray-700">
        Contacts
      </h3>
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        <UserListItems initialUsers={users} />
      </div>
    </aside>
  );
};

export default UserList;
