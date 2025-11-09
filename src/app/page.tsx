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
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className='container mx-auto max-w-3xl space-y-8 px-4 py-8'>
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
            <Link href='rooms/new'>Create Room</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default HomePage;
