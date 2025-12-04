import { createClient } from '@services/supabase/client';
import { useState } from 'react';

import { IMessage } from '@entities/room/types';

interface IParams {
  roomId: string;
  startingMessages: IMessage[];
}

const LIMIT = 25;

const useInfiniteScrollChat = ({ roomId, startingMessages }: IParams) => {
  const [messages, setMessages] = useState<IMessage[]>(startingMessages);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>(
    startingMessages.length === 0 ? 'done' : 'idle',
  );

  const loadMoreMessages = async () => {
    if (status === 'done' || status === 'loading') return;
    const supabase = createClient();
    setStatus('loading');

    const { data: newMessages, error } = await supabase
      .from('message')
      .select('id, text, created_at, author_id, author:user_profile (name, image_url)')
      .eq('chat_room_id', roomId)
      .lt('created_at', messages.at(0)?.created_at)
      .order('created_at', { ascending: false })
      .limit(LIMIT);

    if (error) {
      setStatus('error');
      return;
    }

    setMessages(prev => [...newMessages.toReversed(), ...prev]);
    setStatus(newMessages.length < LIMIT ? 'done' : 'idle');
  };

  const triggerQueryRef = (node: HTMLDivElement | null) => {
    if (node == null) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target === node) {
            observer.unobserve(node);
            loadMoreMessages();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 1.0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  };

  return {
    messages,
    status,
    loadMoreMessages,
    triggerQueryRef,
  };
};

export default useInfiniteScrollChat;
