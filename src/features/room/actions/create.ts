'use server';

import { createAdminClient } from '@services/supabase/server';
import { getCurrentUser } from '@shared/libs/getCurrentUser';
import { redirect } from 'next/navigation';

import { RoomFormSchemaDto } from '@entities/room/contracts';
import { RoomFormSchema } from '@entities/room/types';

interface IParams extends RoomFormSchema {}

const actionCreateRoom = async (data: IParams) => {
  const { success, data: parsedData } = RoomFormSchemaDto.safeParse(data);
  if (!success) return { error: true, message: 'Invalid room data' };

  const user = await getCurrentUser();
  if (user === null) {
    return { error: true, message: 'User not authenticated' };
  }

  const supabase = await createAdminClient();

  // supabase 의 db의 테이블 쿼리 빌더를 반환함.
  const { data: room, error: roomError } = await supabase
    .from('chat_room')
    .insert({
      name: parsedData.name,
      is_public: parsedData.isPublic,
    })
    .select('id')
    .single();

  if (roomError || room === null) {
    return { error: true, message: 'Failed to create room' };
  }

  const { error: memberError } = await supabase.from('chat_room_member').insert({
    chat_room_id: room.id,
    member_id: user.id,
  });

  if (memberError) {
    return { error: true, message: 'Failed to create room member' };
  }

  redirect(`/rooms/${room.id}`);
};

export default actionCreateRoom;
