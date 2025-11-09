'use client';

import { createClient } from '@services/supabase/client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from 'src/shared/shadcn-ui/ui/button';

const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.push('/auth/login');
  };

  return (
    <Button onClick={handleLogout} variant='outline'>
      Logout
    </Button>
  );
};

export default LogoutButton;
