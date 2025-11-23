import { createAdminClient } from '@services/supabase/server';

import { IRoom } from '@entities/room/types';

interface IParams {
  isPublic?: boolean;
}

const getRooms = async ({ isPublic }: IParams): Promise<IRoom[]> => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from('chat_room')
    .select('id, name, chat_room_member (count)')
    .eq('is_public', isPublic)
    .order('name', { ascending: true });

  if (error) return [];

  return (
    data?.map(room => ({
      id: room.id,
      name: room.name,
      memberCount: room.chat_room_member[0]?.count,
    })) || []
  );
};

export default getRooms;
