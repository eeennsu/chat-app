'use client';

import { createClient } from '@services/supabase/client';
import { Nullable } from '@shared/typings/commons';
import { REALTIME_SUBSCRIBE_STATES, RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { IMessage } from '@entities/room/types';

interface IParams {
  userId: string;
  roomId: string;
}

const useRealTimeChat = ({ userId, roomId }: IParams) => {
  const [channel, setChannel] = useState<Nullable<RealtimeChannel>>(null);
  const [connectedUsersCnt, setConnectedUsersCnt] = useState<number>(1);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const supabase = createClient();
    let newChannel: RealtimeChannel;
    let cancel = false;

    supabase.realtime.setAuth().then(() => {
      if (cancel) return;

      // room:roomId:message 라는 채널에 접속,
      newChannel = supabase.channel(`room:${roomId}:messages`, {
        config: {
          private: true,
          presence: {
            key: userId, // 유저 특정
          },
        },
      });

      newChannel
        .on('presence', { event: 'sync' }, () => {
          // 접속자 정보를 가져옴
          const userCnt = Object.keys(newChannel.presenceState()).length;
          setConnectedUsersCnt(userCnt);
        })

        // broadcast 리스너
        .on('broadcast', { event: 'INSERT' }, payload => {
          const record = payload?.payload;

          setMessages(prev => [
            ...prev,
            {
              text: record.text,
              id: record.id,
              author_id: record.author_id,
              created_at: record.created_at,
              author: {
                name: record.author_name,
                image_url: record.author_image_url,
              },
            },
          ]);
        })
        .subscribe(status => {
          if (status !== REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) return;

          // 채널에 입장하였음을 알림
          newChannel.track({
            userId,
          });
        });

      setChannel(newChannel);
    });

    return () => {
      cancel = true;

      if (!newChannel) return;
      newChannel.untrack();
      newChannel.unsubscribe();
    };
  }, [roomId, userId]);

  return {
    channel,
    connectedUsersCnt,
    messages,
  };
};

export default useRealTimeChat;
