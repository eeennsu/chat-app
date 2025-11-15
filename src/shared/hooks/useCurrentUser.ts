import { createClient } from '@services/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth
      .getUser()
      .then(({ data }) => {
        setUser(data.user);
      })
      .finally(() => setIsLoading(false));

    // 로그인, 로그아웃, 토큰 갱신 등 auth 이벤트가 발생할 떄마다 자동 호출
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
};

export default useCurrentUser;
