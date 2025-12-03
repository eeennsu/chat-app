'use server';

import { createAdminClient } from '@services/supabase/server';
import { getCurrentUser } from '@shared/libs/getCurrentUser';
import { IResponse } from '@shared/typings/commons';

import { IMessage } from '@entities/room/types';

interface IParams {
  id: string;
  roomId: string;
  text: string;
}

const actSendMessage = async ({ id, roomId, text }: IParams): Promise<IResponse<IMessage>> => {
  const user = await getCurrentUser();
  if (user === null) {
    return {
      error: true,
      message: 'User not authenticated',
    };
  }

  const supabase = await createAdminClient();

  const { data: membership, error: membershipError } = await supabase
    .from('chat_room_member')
    .select('*')
    .eq('chat_room_id', roomId)
    .eq('member_id', user.id)
    .single();

  if (membershipError || !membership) {
    return {
      error: true,
      message: 'User is not a member of this room',
    };
  }

  const { data: message, error: messageError } = await supabase
    .from('message')
    .insert({
      id,
      chat_room_id: roomId,
      author_id: user.id,
      text,
    })
    .select('id, text, created_at, author_id, author:user_profile (name, image_url)')
    .single();

  if (messageError) {
    return {
      error: true,
      message: 'Failed to send message',
    };
  }

  return {
    error: false,
    data: message,
  };
};

export default actSendMessage;
