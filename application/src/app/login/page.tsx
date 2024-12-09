'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginFormOld from '../components/LoginFormOld';

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // user is already logged in, redirect to home page
  if (status === 'authenticated') {
    router.push('/');
  }

  return <LoginFormOld />;
};

export default LoginPage;
