import { pocketbase } from '../lib/pocketbase';
import { PbChat } from '../types/types';

const getChatById = async (chatId: string) => {
  try {
    const currentUser = pocketbase.authStore.model;

    if (!currentUser) {
      return null;
    }

    const chat = await pocketbase.collection('chats').getOne(chatId, {
      expand: 'users',
    });

    return chat as unknown as PbChat;
  } catch (_) {
    return null;
  }
};

export default getChatById;
