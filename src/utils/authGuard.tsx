'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { user, isAuthenticated } = useAuth();
  const { push, replace } = useRouter();
  const pathname = usePathname();
  if (!isAuthenticated && pathname !== '/login') {
    // Jeśli użytkownik nie jest zalogowany i znajduje się na głównej stronie, nie renderuj dzieci (children)
    redirect('/login');
  }
  useEffect(() => {
    // if (!isAuthenticated && pathname === '/') {
    //   replace('/login');
    // }
    if (
      isAuthenticated &&
      (pathname === '/login' || pathname === '/register')
    ) {
      push('/');
    }
    if (!isAuthenticated && pathname !== '/login' && pathname !== '/register') {
      push('/login');
    }
  }, [isAuthenticated, pathname]);

  return <div>{children}</div>;
}
