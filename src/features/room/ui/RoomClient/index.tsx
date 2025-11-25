import type { FC } from 'react';

import { IMessage, IRoom, IRoomUser } from '@entities/room/types';

interface IProps {
  room: IRoom;
  user: IRoomUser;
  messages: IMessage[];
}

const RoomClient: FC<IProps> = () => {
  return null;
  // return (
  //   <div className='h-screen-with-header container mx-auto flex flex-col border border-y-0'>
  //     <div className='flex items-center justify-between gap-2 p-4'>
  //       <div className='border-b'>
  //         <h1 className='text-2xl font-bold'>{room.name}</h1>
  //         <p className='text-muted-foreground text-sm'>
  //           {connectedUsers} {connectedUsers === 1 ? 'user' : 'users'} online
  //         </p>
  //       </div>
  //       <InviteUserModal roomId={room.id} />
  //     </div>
  //     <div
  //       className='flex grow flex-col-reverse overflow-y-auto'
  //       style={{
  //         scrollbarWidth: 'thin',
  //         scrollbarColor: 'var(--border) transparent',
  //       }}
  //     >
  //       <div>
  //         {status === 'loading' && (
  //           <p className='text-muted-foreground py-2 text-center text-sm'>
  //             Loading more messages...
  //           </p>
  //         )}
  //         {status === 'error' && (
  //           <div className='text-center'>
  //             <p className='text-destructive py-2 text-sm'>Error loading messages.</p>
  //             <Button onClick={loadMoreMessages} variant='outline'>
  //               Retry
  //             </Button>
  //           </div>
  //         )}
  //         {visibleMessages.map((message, index) => (
  //           <ChatMessage
  //             key={message.id}
  //             {...message}
  //             ref={index === 0 && status === 'idle' ? triggerQueryRef : null}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //     <ChatInput
  //       roomId={room.id}
  //       onSend={message => {
  //         setSentMessages(prev => [
  //           ...prev,
  //           {
  //             id: message.id,
  //             text: message.text,
  //             created_at: new Date().toISOString(),
  //             author_id: user.id,
  //             author: {
  //               name: user.name,
  //               image_url: user.image_url,
  //             },
  //             status: 'pending',
  //           },
  //         ]);
  //       }}
  //       onSuccessfulSend={message => {
  //         setSentMessages(prev =>
  //           prev.map(m => (m.id === message.id ? { ...message, status: 'success' } : m)),
  //         );
  //       }}
  //       onErrorSend={id => {
  //         setSentMessages(prev => prev.map(m => (m.id === id ? { ...m, status: 'error' } : m)));
  //       }}
  //     />
  //   </div>
  // );
};

export default RoomClient;
