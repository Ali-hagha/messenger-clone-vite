import { Await, useLoaderData } from 'react-router-dom';
import EmptyChatBox from '../components/ui/EmptyChatBox';
import UserList from '../components/users/UserList';
import { PbUser } from '../types/types';
import { Suspense } from 'react';
import UserListSkeleton from '../components/skeletons/UserListSkeleton';

const UsersPage = () => {
  const { users } = useLoaderData() as { users: Promise<PbUser[] | never[]> };

  return (
    <main className="w-full flex">
      <Suspense fallback={<UserListSkeleton />}>
        <Await resolve={users}>
          {(resolvedUsers: PbUser[]) => <UserList users={resolvedUsers} />}
        </Await>
      </Suspense>
      <EmptyChatBox />
    </main>
  );
};

export default UsersPage;
