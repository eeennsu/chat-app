import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { getCurrentUser } from '@shared/libs/getCurrentUser';
import { redirect } from 'next/navigation';
import { FC } from 'react';

import getJoinedRooms from '@features/room/queries/getJoinedRooms';
import getRooms from '@features/room/queries/getPublicRooms';
import EmptyRoom from '@features/room/ui/EmptyRoom';
import RoomList from '@features/room/ui/RoomList';

const HomePage: FC = async () => {
  const user = await getCurrentUser();
  if (!user) redirect(MAIN_PATHS.auth.login());

  const [publicRooms, joinedRooms] = await Promise.all([
    getRooms({
      isPublic: true,
    }),
    getJoinedRooms({
      userId: user.id,
    }),
  ]);

  return (
    <div className='container mx-auto max-w-3xl space-y-10 px-4 py-8'>
      {publicRooms.length === 0 && joinedRooms.length === 0 ? (
        <EmptyRoom />
      ) : (
        <>
          <RoomList title='Your Rooms' rooms={joinedRooms} isJoined />
          <RoomList
            title='Public Rooms'
            rooms={publicRooms.filter(
              publicRoom => !joinedRooms.some(joinedRoom => joinedRoom.id === publicRoom.id),
            )}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
