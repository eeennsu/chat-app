import { Button } from '@shared/shadcn-ui/ui/button';
import Link from 'next/link';
import type { FC } from 'react';

import { IRoomCard } from '@entities/room/types';

import RoomCard from '../RoomCard';

interface IProps {
  title: string;
  rooms: IRoomCard[];
  isJoined?: boolean;
}

const RoomList: FC<IProps> = ({ title, rooms, isJoined }) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-2'>
        <h2 className='text-2xl'>{title}</h2>
        <Button asChild>
          <Link href='/rooms/new'>Create Room</Link>
        </Button>
      </div>
      {rooms?.length > 0 ? (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
          {rooms.map(room => (
            <RoomCard {...room} key={room.id} isJoined={isJoined} />
          ))}
        </div>
      ) : (
        <div className='text-center'>
          <p className='text-muted-foreground text-sm'>No rooms found</p>
        </div>
      )}
    </div>
  );
};

export default RoomList;
