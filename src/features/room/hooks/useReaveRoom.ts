'use client';

import { createClient } from '@services/supabase/client';
import useCurrentUser from '@shared/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

interface IParams {
  roomId: string;
}

const useLeaveRoom = ({ roomId }: IParams) => {
  const { user } = useCurrentUser();
  const router = useRouter();

  const leaveRoom = async () => {
    if (!user)
      return {
        error: true,
        message: 'User not logged in',
      };

    const supabase = createClient();

    const { error } = await supabase
      .from('chat_room_member')
      .delete()
      .eq('chat_room_id', roomId)
      .eq('member_id', user.id);

    if (error) return { error: true, message: error.message };

    router.refresh();
  };

  return {
    leaveRoom,
  };
};

export default useLeaveRoom;
