'use client';

import dayjs from 'dayjs';
import { useState, type FC } from 'react';

import useRealTimeChat from '@features/room/hooks/useRealTimeChat';

import { IMessage, IRoom, IRoomUser, ISentMessage } from '@entities/room/types';

import ChatInput from '../ChatInput';
import ChatMessage from '../ChatInput/ChatMessage';

interface IProps {
  room: IRoom;
  user: IRoomUser;
  messages: IMessage[];
}

const RoomClient: FC<IProps> = ({ room, messages, user }) => {
  const { connectedUsersCnt, messages: realTimeMessages } = useRealTimeChat({
    userId: user.id,
    roomId: room.id,
  });

  const [sentMessages, setSentMessages] = useState<ISentMessage[]>([]);

  const visibleMessages = messages.toReversed().concat(
    realTimeMessages,
    sentMessages.filter(m => !realTimeMessages.find(rm => rm.id === m.id)),
  );

  const onSendMessage = (message: IMessage) => {
    if (!message) return;

    setSentMessages(prev => [
      ...prev,
      {
        id: message.id,
        created_at: dayjs().toISOString(),
        text: message.text,
        author_id: user.id,
        author: {
          name: user.name,
          image_url: user.image_url,
        },
        status: 'pending',
      },
    ]);
  };

  const onSuccessfulSend = (id: string) => {
    setSentMessages(prev => prev.map(m => (m.id === id ? { ...m, status: 'success' } : m)));
  };

  const onErrorSend = (id: string) => {
    setSentMessages(prev => prev.map(m => (m.id === id ? { ...m, status: 'error' } : m)));
  };

  return (
    <div className='h-screen-with-header container mx-auto flex flex-col border border-y-0'>
      <div className='flex items-center justify-between gap-2 p-4'>
        <div className='border-b'>
          <h1 className='text-2xl font-bold'>{room.name}</h1>
          <p className='text-muted-foreground text-sm'>
            {connectedUsersCnt} {connectedUsersCnt === 1 ? 'user' : 'users'} online
          </p>
        </div>
        {/* <InviteUserModal roomId={room.id} /> */}
      </div>
      <div
        className='flex grow flex-col-reverse overflow-y-auto'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border) transparent',
        }}
      >
        <div>
          {visibleMessages.toReversed().map(message => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>
        {/* <div>
          {status === 'loading' && (
            <p className='text-muted-foreground py-2 text-center text-sm'>
              Loading more messages...
            </p>
          )}
          {status === 'error' && (
            <div className='text-center'>
              <p className='text-destructive py-2 text-sm'>Error loading messages.</p>
              <Button onClick={loadMoreMessages} variant='outline'>
                Retry
              </Button>
            </div>
          )}
          {visibleMessages.map((message, index) => (
            <ChatMessage
              key={message.id}
              {...message}
              ref={index === 0 && status === 'idle' ? triggerQueryRef : null}
            />
          ))}
        </div> */}
      </div>
      <ChatInput
        roomId={room?.id}
        onSendMessage={onSendMessage}
        onSuccessfulSend={onSuccessfulSend}
        onErrorSend={onErrorSend}
      />
    </div>
  );
};

export default RoomClient;
