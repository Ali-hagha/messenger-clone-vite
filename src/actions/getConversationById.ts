import { pocketbase } from '../lib/pocketbase';
import { PbConversation } from '../types/types';

const getConversationById = async (coversationId: string) => {
  try {
    const currentUser = pocketbase.authStore.model;

    if (!currentUser) {
      return null;
    }

    const conversation = await pocketbase
      .collection('conversations')
      .getOne(coversationId, {
        expand: 'users',
      });

    return conversation as unknown as PbConversation;
  } catch (_) {
    return null;
  }
};

export default getConversationById;
