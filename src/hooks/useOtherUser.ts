import { pocketbase } from '../lib/pocketbase';
import { PbConversation } from '../types/types';

const useOtherUser = (conversation: PbConversation) => {
  const currentUserEmail = pocketbase.authStore.model?.email;

  const otherUser = conversation.expand.users.filter(
    user => user.email !== currentUserEmail
  );

  console.log(otherUser);

  return otherUser[0];
};

export default useOtherUser;
