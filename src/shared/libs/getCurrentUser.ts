import { createClient } from '@services/supabase/server';

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();

  return userData.data.user;
};
