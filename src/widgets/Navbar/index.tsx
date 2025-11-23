'use client';

import { MAIN_PATHS } from '@shared/configs/routes/mainPaths';
import useCurrentUser from '@shared/hooks/useCurrentUser';
import { Button } from '@shared/shadcn-ui/ui/button';
import Link from 'next/link';
import { FC } from 'react';

import LogoutButton from '@widgets/LogoutButton';

const Navbar: FC = () => {
  const { user, isLoading } = useCurrentUser();

  return (
    <div className='bg-background h-[4rem] border-b'>
      <nav className='container mx-auto flex h-full items-center justify-between gap-4 px-4'>
        <Link href='/' className='text-xl font-bold'>
          Super chat
        </Link>

        {isLoading || user == null ? (
          <Button asChild>
            <Link href={MAIN_PATHS.auth.login()}>Sign In</Link>
          </Button>
        ) : (
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-sm'>
              {user.user_metadata?.preferred_username || user.email}
            </span>
            <LogoutButton />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
