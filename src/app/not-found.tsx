'use client';

import React from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '~/hooks';

const NotFound = () => {
  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    redirect(isLoggedIn ? '/team' : '/auth');
  }, [isLoggedIn]);
  return <div className=" flex h-screen w-full items-center justify-center text-3xl">Loading...</div>;
};

export default NotFound;
