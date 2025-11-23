'use client';

import { ActionButton } from '@shared/shadcn-ui/ui/action-button';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import useJoinRoom from '@features/room/hooks/useJoinRoom';

interface IProps extends Omit<ComponentProps<typeof ActionButton>, 'action'> {
  roomId: string;
}

const JoinRoomButton: FC<PropsWithChildren<IProps>> = ({ roomId, ...props }) => {
  const { joinRoom } = useJoinRoom({ roomId });

  return (
    <ActionButton {...props} action={joinRoom}>
      JoinRoomButton
    </ActionButton>
  );
};

export default JoinRoomButton;
