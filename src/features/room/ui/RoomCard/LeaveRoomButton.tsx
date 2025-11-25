'use client';

import { ActionButton } from '@shared/shadcn-ui/ui/action-button';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import useLeaveRoom from '@features/room/hooks/useReaveRoom';

interface IProps extends Omit<ComponentProps<typeof ActionButton>, 'action'> {
  roomId: string;
}

const LeaveRoomButton: FC<PropsWithChildren<IProps>> = ({ roomId, ...props }) => {
  const { leaveRoom } = useLeaveRoom({ roomId });

  return (
    <ActionButton className='cursor-pointer' {...props} requireAreYouSure action={leaveRoom}>
      Leave
    </ActionButton>
  );
};

export default LeaveRoomButton;
