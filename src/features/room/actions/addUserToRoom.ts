'use server';

import { createAdminClient } from '@services/supabase/server';
import { getCurrentUser } from '@shared/libs/getCurrentUser';

interface IParams {
  roomId: string;
  userId: string;
}

const actAddUserToRoom = async ({ roomId, userId }: IParams) => {
  const currentUser = await getCurrentUser();
  if (currentUser == null) {
    return {
      error: true,
      message: 'User not authenticated',
    };
  }

  const supabase = await createAdminClient();
  const { data: roomMembership, error: roomMembershipError } = await supabase
    .from('chat_room_member')
    .select('member_id')
    .eq('chat_room_id', roomId)
    .eq('member_id', currentUser.id)
    .single();

  if (roomMembershipError || roomMembership == null) {
    return {
      error: true,
      message: 'User is not a member of this room',
    };
  }

  const { data: userProfile, error: userError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('id', userId)
    .single();

  if (userError || userProfile == null) {
    return {
      error: true,
      message: 'User not found',
    };
  }

  const { data: existingMembership } = await supabase
    .from('chat_room_member')
    .select('member_id')
    .eq('chat_room_id', roomId)
    .eq('member_id', userId)
    .single();

  if (existingMembership != null) {
    return {
      error: true,
      message: 'User is already a member of this room',
    };
  }

  const { error: insertError } = await supabase.from('chat_room_member').insert({
    chat_room_id: roomId,
    member_id: userProfile.id,
  });

  if (insertError) {
    return {
      error: true,
      message: 'Failed to add user to room',
    };
  }

  return {
    error: false,
    message: 'User added to room',
  };
};

export default actAddUserToRoom;
