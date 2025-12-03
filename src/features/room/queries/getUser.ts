import { createAdminClient } from '@services/supabase/server';
import { getCurrentUser } from '@shared/libs/getCurrentUser';
import { Nullable } from '@shared/typings/commons';

import { IRoomUser } from '@entities/room/types';

const getUser = async (): Promise<Nullable<IRoomUser>> => {
  const user = await getCurrentUser();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from('user_profile')
    .select('id, name, image_url')
    .eq('id', user?.id)
    .single();

  if (error) return null;

  return data;
};

export default getUser;
