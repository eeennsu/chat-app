'use client';

import { createClient } from '@services/supabase/client';
import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import useCurrentUser from '@shared/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

interface IParams {
  roomId: string;
}

const useJoinRoom = ({ roomId }: IParams) => {
  const { user } = useCurrentUser();
  const router = useRouter();

  const joinRoom = async () => {
    if (!user) return { error: true, message: 'User not logged in' };

    const supabase = createClient();

    const { error } = await supabase.from('chat_room_member').insert({
      chat_room_id: roomId,
      member_id: user.id,
    });

    if (error) return { error: true, message: 'Failed to join Room' };

    router.push(MAIN_PATHS.rooms.slug({ slug: roomId }));
  };

  return {
    joinRoom,
  };
};

export default useJoinRoom;
