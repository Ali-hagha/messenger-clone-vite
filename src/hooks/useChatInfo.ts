import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const useChatInfo = () => {
  const params = useParams();

  const chatId = useMemo(() => {
    if (!params?.chatId) {
      return '';
    }

    return params.chatId as string;
  }, [params.chatId]);

  const isChatOpen = useMemo(() => !!chatId, [chatId]);

  return useMemo(
    () => ({
      isChatOpen,
      chatId,
    }),
    [isChatOpen, chatId]
  );
};

export default useChatInfo;
