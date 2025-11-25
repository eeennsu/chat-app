import { createClient } from '@services/supabase/server';
import { getCurrentUser } from '@shared/libs/getCurrentUser';
import { Nullable } from '@shared/typings/commons';

import { IRoom } from '@entities/room/types';

interface IParams {
  chatRoomId: string;
}

const getRoom = async ({ chatRoomId }: IParams): Promise<Nullable<IRoom>> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: room, error } = await supabase
    .from('chat_room')
    .select('id, name, chat_room_member!inner ()')
    .eq('id', chatRoomId)
    .eq('chat_room_member.member_id', user.id)
    .single();

  if (error) return null;
  return room;
};

export default getRoom;
