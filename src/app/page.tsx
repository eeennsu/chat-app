import { Button } from '@shared/shared-ui/ui/button';
import Link from 'next/link';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div>
      <div>hello world!</div>
      <Button>
        <Link href='/blog/4?search=hello'>to blog!</Link>
      </Button>
    </div>
  );
};

export default HomePage;
