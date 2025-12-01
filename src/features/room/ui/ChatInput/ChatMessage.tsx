import { DATE_FORMATTER } from '@shared/libs/date';
import { cn } from '@shared/shadcn-ui/utils';
import { StatusType } from '@shared/typings/commons';
import { User2Icon } from 'lucide-react';
import Image from 'next/image';
import { Ref } from 'react';

import { IMessage } from '@entities/room/types';

export function ChatMessage({
  text,
  author,
  created_at,
  status,
  ref,
}: IMessage & {
  status?: StatusType;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        'hover:bg-accent/50 flex gap-4 px-4 py-2',
        status === 'pending' && 'pointer-events-none opacity-70',
        status === 'error' && 'bg-destructive/10 text-destructive',
      )}
    >
      <div className='shrink-0'>
        {author?.image_url  ? (
          <Image
            src={author?.image_url}
            alt={author?.name}
            width={40}
            height={40}
            className='rounded-full'
          />
        ) : (
          <div className='bg-muted text-muted-foreground flex size-10 items-center justify-center overflow-hidden rounded-full border'>
            <User2Icon className='mt-2.5 size-[30px]' />
          </div>
        )}
      </div>
      <div className='grow space-y-0.5'>
        <div className='flex items-baseline gap-2'>
          <span className='text-sm font-semibold'>{author?.name}</span>
          <span className='text-muted-foreground text-xs'>
            {DATE_FORMATTER.format(new Date(created_at))}
          </span>
        </div>
        <p className='wrap-break-words text-sm whitespace-pre'>{text}</p>
      </div>
    </div>
  );
}
