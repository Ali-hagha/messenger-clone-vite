import { pocketbase } from '../lib/pocketbase';
import { PbUser } from '../types/types';

const getUsers = async () => {
  const currentUser = pocketbase.authStore.model;

  if (!currentUser?.email) {
    return [];
  }

  try {
    const users = await pocketbase.collection('users').getFullList({
      sort: '-created',
      filter: `id != '${currentUser.id}'`,
    });
    console.log(users);

    return users as unknown as PbUser[];
  } catch (_) {
    return [];
  }
};

export default getUsers;
