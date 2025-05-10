'use client';

import { useEffect } from 'react';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  if (hasCookie('token') == true) {
    deleteCookie('token');
  }
  useEffect(() => {
    router.push('/events');
  });
}
