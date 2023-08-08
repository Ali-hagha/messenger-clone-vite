import { pocketbase } from '../lib/pocketbase';
import { PbConversation } from '../types/types';

const getConversations = async () => {
  const currentUser = pocketbase.authStore.model;

  if (!currentUser?.email) {
    return [];
  }

  try {
    const conversations = await pocketbase
      .collection('conversations')
      .getFullList({
        sort: '-created',
        expand: 'users',
        filter: `users ~ '${currentUser.id}'`,
      });
    return conversations as unknown as PbConversation[];
  } catch (_) {
    return [];
  }
};

export default getConversations;
