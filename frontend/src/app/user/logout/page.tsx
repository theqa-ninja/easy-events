'use client';

import React from 'react';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  React.useEffect(() => {
    fetch('http://localhost:3000/auth/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        if (hasCookie('token') == true) {
          deleteCookie('token');
        }
        router.push('/user/login');
      });
  }, []);
}
