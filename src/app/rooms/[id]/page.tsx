import type {} from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

import getMessage from '@features/room/queries/getMessages';
import getRoom from '@features/room/queries/getRoom';
import getUser from '@features/room/queries/getUser';
import RoomClient from '@features/room/ui/RoomClient';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailRoomPage: FC<IParams> = async ({ params }) => {
  const { id } = await params;
  const [room, user, messages] = await Promise.all([
    getRoom({ chatRoomId: id }),
    getUser(),
    getMessage({ chatRoomId: id }),
  ]);

  if (room === null || user === null) return notFound();

  return <RoomClient room={room} user={user} messages={messages} />;
};

export default DetailRoomPage;
