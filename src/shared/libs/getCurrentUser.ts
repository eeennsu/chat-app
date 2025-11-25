import { createClient } from '@services/supabase/server';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();

  return userData.data.user;
});

// cache 는 동일한 렌더링에서 여러번 호출될 때, 케시되어 한번만 호출하게 함.
