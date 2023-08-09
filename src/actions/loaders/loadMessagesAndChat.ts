import { Params, defer } from 'react-router-dom';
import getMessages from '../getMessages';
import getChatById from '../getChatById';

const loadMessagesAndChat = async ({ params }: { params: Params<string> }) => {
  const messages = getMessages(params.chatId!);
  const chat = getChatById(params.chatId!);

  return defer({ messages, chat });
};

export default loadMessagesAndChat;
