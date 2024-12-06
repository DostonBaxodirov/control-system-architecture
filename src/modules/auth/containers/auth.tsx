import { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';

import { useAuth } from '~/hooks';

interface AuthProps {
  children: ReactNode;
}

const Auth: FC<AuthProps> = ({ children }) => {
  const pathname = usePathname();
  const { isLoggedIn, userId } = useAuth();
  const [loaded, setLoaded] = useState(isLoggedIn);

  useLayoutEffect(() => {
    function loader() {
      if (isLoggedIn && !!userId && pathname === '/auth') {
        redirect('/team');
      } else setLoaded(true);
    }

    loader();
  }, [pathname, isLoggedIn, userId]);

  return loaded ? children : <h1 className="m-auto flex h-screen w-full items-center justify-center">Loading...</h1>;
};

export default Auth;
