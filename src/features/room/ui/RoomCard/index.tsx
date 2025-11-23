import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Button } from '@shared/shadcn-ui/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/shadcn-ui/ui/card';
import Link from 'next/link';
import type { FC } from 'react';

import JoinRoomButton from './JoinRoomButton';
import LeaveRoomButton from './LeaveRoomButton';

interface IProps {
  id: string;
  name: string;
  memberCount: number;
  isJoined: boolean;
}

const RoomCard: FC<IProps> = ({ id, name, memberCount, isJoined }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </CardDescription>
      </CardHeader>
      <CardFooter className='gap-2'>
        {isJoined ? (
          <>
            <Button asChild className='grow' size='sm'>
              <Link href={MAIN_PATHS.rooms.slug({ slug: id })}>Enter</Link>
            </Button>
            <LeaveRoomButton roomId={id} size='sm' variant='destructive'>
              Leave
            </LeaveRoomButton>
          </>
        ) : (
          <JoinRoomButton roomId={id} variant='outline' className='grow' size='sm'>
            Join
          </JoinRoomButton>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
