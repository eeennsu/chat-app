import { createClient } from '@services/supabase/server';

import { IMessage } from '@entities/room/types';

interface IParams {
  chatRoomId: string;
  limit?: number;
}

const getMessage = async ({ chatRoomId, limit = 100 }: IParams): Promise<IMessage[]> => {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from('message')
    .select('id, text, created_at, author_id, author:user_profile (name, image_url)')
    .eq('chat_room_id', chatRoomId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];

  return messages;
};

export default getMessage;
