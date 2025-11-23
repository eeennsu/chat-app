import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import { Button } from '@shared/shadcn-ui/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@shared/shadcn-ui/ui/empty';
import { MessagesSquareIcon } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

const EmptyRoom: FC = () => {
  return (
    <Empty className='border border-dashed'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <MessagesSquareIcon />
        </EmptyMedia>
        <EmptyTitle>No Chat Rooms</EmptyTitle>
        <EmptyDescription>Create a new chat room to get started</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href={MAIN_PATHS.rooms.new()}>Create Room</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyRoom;
