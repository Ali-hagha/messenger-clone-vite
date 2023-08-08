import { useLoaderData } from 'react-router-dom';
import EmptyChatBox from '../components/ui/EmptyChatBox';
import UserList from '../components/users/UserList';
import { PbUser } from '../types/types';

const UsersPage = () => {
  const users = useLoaderData() as PbUser[];

  return (
    <main className="w-full flex">
      <UserList users={users} />
      <EmptyChatBox />
    </main>
  );
};

export default UsersPage;
