import { pocketbase } from '../lib/pocketbase';
import { PbChat } from '../types/types';

const useOtherUser = (conversation: PbChat) => {
  const currentUserEmail = pocketbase.authStore.model?.email;

  const otherUser = conversation.expand.users.filter(
    user => user.email !== currentUserEmail
  );

  return otherUser[0];
};

export default useOtherUser;
