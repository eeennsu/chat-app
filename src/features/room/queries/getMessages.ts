import { createAdminClient } from '@services/supabase/server';

import { IMessage } from '@entities/room/types';

interface IParams {
  chatRoomId: string;
  limit?: number;
}

const getMessages = async ({ chatRoomId }: IParams): Promise<IMessage[]> => {
  const supabase = await createAdminClient();

  const { data: messages, error } = await supabase
    .from('message')
    .select('id, text, created_at, author_id, author:user_profile (name, image_url)')
    .eq('chat_room_id', chatRoomId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) return [];
  return messages;
};

export default getMessages;
