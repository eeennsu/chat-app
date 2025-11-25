import { createAdminClient } from '@services/supabase/server';

import { IRoomCard } from '@entities/room/types';

interface IParams {
  userId: string;
}

const getJoinedRooms = async ({ userId }: IParams): Promise<IRoomCard[]> => {
  if (!userId) return [];

  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from('chat_room')
    .select('id, name, chat_room_member!inner (member_id)')
    .eq('is_public', true)
    .eq('chat_room_member.member_id', userId)
    .order('name', { ascending: true });

  if (error) return [];

  return (
    data?.map(room => ({
      id: room.id,
      name: room.name,
      memberCount: room.chat_room_member.length,
    })) || []
  );
};

export default getJoinedRooms;
