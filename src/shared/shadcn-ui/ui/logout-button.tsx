'use client';

import { createClient } from '@supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from 'src/shared/shadcn-ui/ui/button';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.push('/auth/login');
  };

  return <Button onClick={logout}>Logout</Button>;
}
