import { pocketbase } from '../lib/pocketbase';
import { PbMessage } from '../types/types';

const getMessages = async (conversationId: string) => {
  try {
    const messages = await pocketbase.collection('messages').getFullList({
      sort: '+created',
      filter: `conversation = '${conversationId}'`,
      expand: 'sender,seenBy',
    });

    return messages as unknown as PbMessage[];
  } catch (_) {
    return [];
  }
};

export default getMessages;
