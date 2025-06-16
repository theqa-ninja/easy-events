'use client';

import React from 'react';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/app/user/users.service';

export default function Logout() {
  const router = useRouter();

  React.useEffect(() => {
    signOutUser()
      .then(() => {
        if (hasCookie('token') == true) {
          deleteCookie('token');
        }
        router.push('/user/login');
      });
  }, []);
}
